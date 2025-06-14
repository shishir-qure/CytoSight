export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.molecularmatch.com/v4/trial/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: "5c6c69c4-9133-4243-b408-9185ca97fa5c",
        filters: [
          { facet: "CONDITION", term: "NSCLC" },
          { facet: "RESISTANCE", term: "osimertinib resistance" },
          { facet: "STATUS", term: "Recruiting" },
          { facet: "TRIALTYPE", term: "Interventional" },
        ],
        start: 0,
        limit: 10,
      }),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
