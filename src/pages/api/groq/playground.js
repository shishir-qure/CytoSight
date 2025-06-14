export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // increase limit
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
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

  // Parse the JSON body
  const _body = JSON.parse(req.body);
  const base64Audio = _body.audioFile;
  const prompt = _body.prompt;
  const audioType = _body.audioType;
  const model = _body.model;
  const language = _body.language;

  const filename = "recording.wav";
  const mimeType = "audio/wav";

  const audioFile = base64ToFile(base64Audio, filename, mimeType);

  if (!audioFile) {
    return res.status(400).json({ error: "No audio file provided" });
  }

  // Prepare form data for Groq API
  const groqForm = new FormData();
  groqForm.append("file", audioFile, "audio.wav");
  groqForm.append("model", model);
  groqForm.append("response_format", "verbose_json");
  groqForm.append("language", language);
  groqForm.append("temperature", "0");

  // Send request to Groq API
  const groqRes = await fetch(`https://api.groq.com/openai/v1/audio/${audioType}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer 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`, // <-- Replace with your key
    },
    body: groqForm,
  });

  const data = await groqRes.json();

  return res.status(200).json(data);
}
