// @see https://docs.elevenlabs.io/api-reference/speech-to-text

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // increase limit for audio
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Set your ElevenLabs API key here or use env variable
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
    return res.status(500).json({
      error: "Missing ElevenLabs API key. Set ELEVENLABS_API_KEY env variable.",
    });
  }

  const { base64Audio } = req.body;
  if (!base64Audio) {
    return res.status(400).json({ error: "Missing base64Audio in request body." });
  }

  // Convert base64 to Buffer
  const audioBuffer = Buffer.from(base64Audio, "base64");

  // Prepare form data
  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer]), "audio.webm");
  formData.append("model_id", "scribe_v1");
  formData.append("language_code", "eng");
  // You can set "model" and "language" if needed, see ElevenLabs docs

  try {
    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: formData,
    });
    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: "ElevenLabs API error", details: err });
    }
    const data = await response.json();
    // The transcript is in data.text or data.transcript depending on API version
    const text = data.text || data.transcript || "";
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
