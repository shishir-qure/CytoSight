import Portkey from "portkey-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const client = new Portkey({
    apiKey: process.env.NEXT_PUBLIC_PORTKEY_API_KEY,
    virtualKey: process.env.NEXT_PUBLIC_PORTKEY_VIRTUAL_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      messages: message,
      model: "gpt-4o",
    });
    res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
