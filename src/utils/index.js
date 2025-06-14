function formatVitals(rawVitals) {
  if (!Array.isArray(rawVitals) || !Array.isArray(rawVitals[0])) return [];

  return rawVitals[0].map((item) => {
    const [focusKey, ...valueParts] = item.focus.split(":");
    return {
      focus: focusKey.trim(),
      value: valueParts.join(":").trim(),
      lastUpdated: item.created_at,
    };
  });
}

function mergeVitals(existing, newVitals) {
  const existingList =
    Array.isArray(existing) && Array.isArray(existing[0]) ? existing[0] : [];

  const nowISO = new Date().toISOString();

  const newFormatted = newVitals.map((vital, index) => ({
    id: Date.now() + index, // Generate temp unique ID if needed
    focus: `${vital.focus}: ${vital.value}`,
    created_at: vital.lastUpdated || nowISO,
  }));

  return [[...existingList, ...newFormatted]];
}

export { formatVitals, mergeVitals };
