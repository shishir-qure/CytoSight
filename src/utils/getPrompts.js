const getPrompts = () => {
  const vitals = `
You are given a physician’s free-text transcription.

Your task is to extract and update the patient’s vitals in the structured template format.

Follow these strict rules:

1. Identify & Update Vitals: Update only the vitals that you can confidently extract from the transcription.
2. Units: If a value is expressed in different units (e.g., Celsius vs Fahrenheit), convert it to the units used in the provided template before updating.
3. Partial Data: If a vital is not clearly mentioned, leave its value unchanged.
4. Sanity Check: Do not update any vital if the value is physiologically impossible or outside any plausible human range (e.g., temperature = 150°C).

Output format (return a single JSON object):

- "updated_fields": An array of the vital names (keys) that were changed.
- "vitals": The full vitals object with your updates applied. For each vital, include:
    - "value": the latest known value
    - "is_updated": true if you changed this field, false otherwise
- "interpretation": An object labeling each vital as either "normal" or "abnormal" based on standard clinical ranges.

⚠️ Return only a single valid JSON object in the exact format shown below.

Example Output Format:

{
  "updated_fields": ["temperature", "blood_pressure"],
  "vitals": {
    "temperature": {
      "value": "98.6F",
      "is_updated": true
    },
    "blood_pressure": {
      "value": "120/80",
      "is_updated": true
    },
    "heart_rate": {
      "value": "72bpm",
      "is_updated": false
    }
  },
  "interpretation": {
    "temperature": "normal",
    "blood_pressure": "normal",
    "heart_rate": "normal"
  }
}
`;

  return { vitals };
};

export default getPrompts;
