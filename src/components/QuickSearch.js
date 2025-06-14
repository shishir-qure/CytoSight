import Link from "next/link";
import { useState, useEffect } from "react";

const QuickSearch = ({ currentPatient }) => {
  const [loading, setLoading] = useState(true);
  const [molecularData, setMolecularData] = useState(null);

  useEffect(() => {
    const fetchMolecularData = async () => {
      setLoading(true);
      const molecularData = await fetch("/api/portkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [
            {
              role: "system",
              content:
                "You are a clinical assistant with access to MolecularMatch Knowledge platform.",
            },
            {
              role: "user",
              content:
                `Given the following patient information (lung cancer case only):\n${currentPatient}\n\n` +
                "Search the MolecularMatch knowledge platform (https://app.molecularmatch.com/covid#sk/U5ppkrER8W) " +
                "for relevant clinical trials, targeted drugs, and publications that match this patient's molecular and clinical profile. " +
                "If the patient has a specific mutation, biomarker, or clinical feature, prioritize findings that match those. " +
                "Return your response as a JSON object with the following structure:\n" +
                "{\n" +
                '  "clinical_trials": [\n' +
                '    {"title": "...", "nct_id": "...", "summary": "...", "link": "...", "phase": "..."}\n' +
                "  ],\n" +
                '  "targeted_drugs": [\n' +
                '    {"name": "...", "indication": "...", "summary": "...", "link": "..."}\n' +
                "  ],\n" +
                '  "publications": [\n' +
                '    {"title": "...", "journal": "...", "year": 2020, "summary": "...", "link": "..."}\n' +
                "  ],\n" +
                '  "source": "MolecularMatch (https://app.molecularmatch.com/covid#sk/U5ppkrER8W)"\n' +
                "}\n" +
                "For each category, provide concise, evidence-based key points. " +
                "If no direct match is found, provide the most relevant, up-to-date general findings for lung cancer in each category. " +
                "Do not include findings or recommendations for non-lung cancer conditions. " +
                "Respond ONLY with a valid JSON object. Do not include any extra text, markdown, or explanation. Do not wrap the JSON in a code block.",
            },
          ],
        }),
      });
      const _molecularData = await molecularData.json();
      setMolecularData(JSON.parse(_molecularData?.result ?? "{}"));
      // setLoading(false);
    };
    if (!!currentPatient) {
      fetchMolecularData();
    }
  }, [currentPatient]);
  return (
    <div className="flex-1 p-5">
      {/* <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Quick Search</p>
      </div> */}

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Matching Case Trials</h2>
          <p className="text-gray-300 text-sm">
            Find the best matching case trials for your patient
          </p>
        </div>
        {!loading ? (
          <div className="flex items-center justify-center h-40">
            <svg className="animate-spin h-8 w-8 text-teal-400 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-teal-300 text-lg">Loading matching case trials...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {molecularData?.clinical_trials?.map((data, index) => (
              <div className="bg-gray-800 px-4 py-5 rounded-lg space-y-2" key={index}>
                <Link href={data?.link} target="_blank">
                  <div className="flex items-start justify-between space-x-4">
                    <p className="text-gray-200 text-lg font-semibold hover:text-white">
                      <span className="text-teal-400 underline">{data?.nct_id}</span> -{" "}
                      {data?.title}
                    </p>
                    <p className="font-semibold text-teal-200 whitespace-nowrap">
                      {data?.phase}
                    </p>
                  </div>
                  <p className="text-gray-100 text-base">{data?.summary}</p>
                </Link>
                <button className="bg-teal-700 w-fit ml-auto hover:bg-teal-800 px-4 py-2 mt-4 rounded-lg text-sm cursor-pointer flex">
                  Send to Patient Channel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickSearch;
