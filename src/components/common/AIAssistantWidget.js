"use client";

import { useState, useRef } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import Toast from "../Toast";
import { useRouter } from "next/router";

export default function AIAssistantWidget({ setCurrentPatient, currentPatient }) {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sessionEnded, setSessionEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const vadRef = useRef(null);
  const router = useRouter();

  const patient_uid = router.query.patient_uid;

  // Send audio chunk to ElevenLabs API route
  const transcribeAudio = async (audioBuffer) => {
    setLoading(true);
    setError("");
    try {
      // Convert Float32Array buffer to WAV and then to base64
      const wav = utils.encodeWAV(audioBuffer);
      const base64Audio = utils.arrayBufferToBase64(wav);
      const res = await fetch("/api/elevenlabs/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Audio }),
      });
      const data = await res.json();
      if (data?.text) {
        setTranscript((prev) => prev + (prev ? " " : "") + data.text);
      } else {
        setError("No transcript received.");
      }
    } catch (err) {
      setError("Failed to transcribe audio.");
    } finally {
      setLoading(false);
    }
  };

  // VAD setup
  const vad = useMicVAD({
    userSpeakingThreshold: 0.5,
    onSpeechStart: () => {
      setLoading(false);
    },
    onSpeechEnd: (audioBuffer) => {
      // Only send if audioBuffer is not empty
      if (audioBuffer && audioBuffer.length > 1000) {
        transcribeAudio(audioBuffer);
      }
    },
    startOnLoad: false,
  });
  vadRef.current = vad;

  // Start VAD listening
  const startListening = async () => {
    setListening(true);
    setSessionEnded(false);
    setTranscript("");
    setError("");
    try {
      await vad.start();
    } catch (err) {
      setError("Microphone access denied or not available.");
      setListening(false);
    }
  };

  // Stop VAD listening
  const stopListening = async () => {
    setListening(false);
    setSessionEnded(true);
    setLoading(false);
    setError("");
    try {
      await vad.pause();
    } catch (err) {
      // ignore
    }
  };

  const handleSendToChannel = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${patient_uid}/messages/add/`,
        {
          method: "POST",
          body: JSON.stringify({ message: transcript }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      setCurrentPatient({
        ...currentPatient,
        messages: [{ message: transcript }, ...currentPatient.messages],
      });
      setOpen(false);
      Toast.success("Message sent to patient channel");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenerateNotes = () => {
    // TODO: Send transcript to backend for notes generation
    alert("Generate Physician&apos;s Notes for: " + transcript);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`fixed bottom-6 right-6 rounded-full p-4 shadow-lg z-50 cursor-pointer transition-colors
          ${listening ? "bg-teal-500 animate-pulse" : "bg-[#FF7869]"}
        `}
        aria-label={listening ? "Microphone is active" : "Open AI Assistant"}
        onClick={() => setOpen(true)}
        title="Open AI Assistant"
      >
        <FaMicrophone className="text-white text-2xl" />
      </button>

      {/* Popup Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-end justify-end z-50"
          onClick={(e) => {
            // Only close if the user clicks the overlay, not the modal content
            if (e.target === e.currentTarget) {
              setOpen(false); // Do not stop listening, just close popup
            }
          }}
        >
          <div className="bg-white text-black rounded-t-lg w-full max-w-sm p-6 shadow-lg m-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">AI Medical Assistant</span>
              <button onClick={() => setOpen(false)} className="cursor-pointer">
                <FaTimes />
              </button>
            </div>
            {!sessionEnded ? (
              <>
                <p className="mb-2 text-sm text-gray-600">
                  This assistant will track your conversation. Enable the mic to start.
                </p>
                <div className="border rounded p-2 h-32 overflow-y-auto mb-2 bg-gray-100">
                  {transcript || (
                    <span className="text-gray-400">Transcript will appear here...</span>
                  )}
                </div>
                {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
                {loading && (
                  <div className="text-blue-500 text-xs mb-2">Transcribing...</div>
                )}
                <button
                  className={`w-full py-2 rounded-lg cursor-pointer ${
                    listening ? "bg-red-500" : "bg-teal-600"
                  } text-white`}
                  onClick={listening ? stopListening : startListening}
                  disabled={loading}
                >
                  {listening ? "Stop & End Session" : "Enable Microphone"}
                </button>
              </>
            ) : (
              <>
                <div className="border rounded p-2 h-32 overflow-y-auto mb-2 bg-gray-100">
                  {transcript}
                </div>
                <button
                  className="w-full py-2 rounded bg-teal-600 text-white mb-2 cursor-pointer"
                  onClick={handleSendToChannel}
                >
                  Send to Patient Channel
                </button>
                <button
                  className="w-full py-2 rounded bg-teal-600 text-white mb-2 cursor-pointer"
                  onClick={handleGenerateNotes}
                >
                  Generate Physician&apos;s Notes
                </button>
                <button
                  className="w-full py-2 rounded bg-gray-400 text-white mt-2 cursor-pointer"
                  onClick={() => {
                    setTranscript("");
                    setError("");
                    setSessionEnded(false);
                  }}
                >
                  Restart Session
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
