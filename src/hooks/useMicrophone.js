import { useState, useRef } from "react";
import { useMicVAD, utils } from "@ricky0123/vad-react";

const useMicrophone = ({ activeTab }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioStreamRef = useRef(null);
  const recorderRef = useRef(null);
  const isReadyToPost = useRef(false);

  const vad = useMicVAD({
    userSpeakingThreshold: 0.5,
    onSpeechStart: () => {
      console.log("onSpeechStart");
    },
    onSpeechEnd: (audio) => {
      console.log("onSpeechEnd", audio);
      handleVADdata(audio);
    },
    startOnLoad: isRecording,
  });

  async function handleVADdata(audio) {
    const encodedAudio = utils.encodeWAV(audio);
    const base64Audio = utils.arrayBufferToBase64(encodedAudio);

    const audioSummarisationModel = "translations";

    const response = await fetch("/api/groq/transcribe", {
      method: "POST",
      body: JSON.stringify({ base64Audio, audioSummarisationModel }),
    });

    const data = await response.json();
    console.log({ data });
    getSummary(data.text);
  }

  function getSummary(text) {
    console.log("here123", { text });
  }

  function recordAudioChunkToBase64(stream) {
    let currentChunks = [];
    let saveInterval = 0;
    let recorder;
    const CHUNK_DURATION = 10000; // 10 seconds per chunk

    const createRecorder = () => {
      const mimeType = "audio/webm";

      const newRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
      });

      recorderRef.current = newRecorder;

      newRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          currentChunks.push(event.data);
        }
      };

      newRecorder.onstop = async () => {
        try {
          if (currentChunks.length > 0) {
            const blob = new Blob(currentChunks, { type: "audio/webm" });
            const fileName = `audio_${Date.now()}.webm`;
            // await aiService.uploadAudioFile({
            //   file: blob,
            //   patientId: patient_uid as string,
            //   visitId: patientDetails.visit_id,
            //   sourceId: default_workspace_uuid as string,
            //   filename: fileName,
            // });
            currentChunks = [];
          }

          if (stream.active) {
            recorder = createRecorder();
            recorder.start();
          }
        } catch (error) {
          console.error("Error processing audio chunk:", error);
          // Clean up on error
          if (stream.active) {
            stream.getTracks().forEach((track) => track.stop());
          }
        }
      };

      return newRecorder;
    };

    // Start first recorder
    recorder = createRecorder();
    recorder.start();

    // Stop current recorder every CHUNK_DURATION milliseconds
    saveInterval = window.setInterval(() => {
      if (recorder && recorder.state === "recording") {
        recorder.stop();
      }
    }, CHUNK_DURATION);

    return {
      stop: () => {
        if (saveInterval) {
          clearInterval(saveInterval);
        }
        if (recorder && recorder.state === "recording") {
          recorder.stop();
        }
        if (stream.active) {
          stream.getTracks().forEach((track) => track.stop());
        }
      },
    };
  }

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        // Request microphone access first
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;

        // Start recording with chunks
        const recorder = recordAudioChunkToBase64(stream);
        recorderRef.current = recorder;

        // Start VAD
        await vad.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Failed to start recording:", error);
        // Clean up if there's an error
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          audioStreamRef.current = null;
        }
      }
    } else {
      try {
        // Stop VAD
        await vad.pause();

        // Stop recording and clean up
        if (recorderRef.current) {
          recorderRef.current.stop();
          recorderRef.current = null;
        }

        // Stop audio stream
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          audioStreamRef.current = null;
        }

        setIsRecording(false);
        if (isReadyToPost.current) {
          postPatientDetails();
        }
      } catch (error) {
        console.error("Failed to stop recording:", error);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };
  return {
    isRecording,
    audioBlob,
    audioUrl,
    startRecording,
    toggleRecording,
  };
};

export default useMicrophone;
