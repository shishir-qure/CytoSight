export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // increase limit
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  function base64ToFile(base64String, filename, mimeType) {
    // Remove the Base64 prefix if it exists
    const base64Data = base64String.includes(",")
      ? base64String.split(",")[1]
      : base64String;

    // Decode Base64 string
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Convert to Uint8Array
    const byteArray = new Uint8Array(byteNumbers);

    // Create a File object
    return new File([byteArray], filename, { type: mimeType });
  }

  const _body = JSON.parse(req.body);
  const base64Audio = _body.base64Audio;
  const audioSummarisationModel = _body.audioSummarisationModel;

  const filename = "recording.wav";
  const mimeType = "audio/wav";

  const audioFile = base64ToFile(base64Audio, filename, mimeType);

  if (!audioFile) {
    return res.status(400).json({ error: "No audio file provided" });
  }

  // Prepare form data for Groq API
  const groqForm = new FormData();
  groqForm.append("file", audioFile, "audio.wav");
  groqForm.append(
    "model",
    audioSummarisationModel === "translations"
      ? "whisper-large-v3"
      : "whisper-large-v3-turbo"
  );
  groqForm.append("response_format", "verbose_json");
  //   groqForm.append("language", "hi");
  groqForm.append("temperature", "0");

  // Send request to Groq API
  const groqRes = await fetch(
    `https://api.groq.com/openai/v1/audio/${audioSummarisationModel}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`, // <-- Replace with your key
      },
      body: groqForm,
    }
  );

  const data = await groqRes.json();

  return res.status(200).json(data);
}
