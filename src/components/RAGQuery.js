// pages/index.js
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import PdfUpload from "./PdfUpload";

export default function RAGQuery({ currentPatient }) {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    const formatData = (data) => {
      if (!data) return "";
      if (Array.isArray(data)) {
        return data?.map((item) => JSON.stringify(item, null, 2)).join("\n");
      }
      return JSON.stringify(data, null, 2);
    };

    const _context = [
      currentPatient?.care_plans &&
        `Care Plans:\n${formatData(currentPatient.care_plans)}`,
      currentPatient?.clinical_notes &&
        `Clinical Notes:\n${formatData(currentPatient.clinical_notes)}`,
      currentPatient?.diagnostic_tests &&
        `Diagnostic Tests:\n${formatData(currentPatient.diagnostic_tests)}`,
      currentPatient?.medications &&
        `Medications:\n${formatData(currentPatient.medications)}`,
      currentPatient?.risk_assessment &&
        `Risk Assessment:\n${formatData(currentPatient.risk_assessment)}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    setLoading(true);
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, patientContext: _context }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setCitations(data.citations);
    setLoading(false);
  };
  const [fullscreen, setFullscreen] = useState(false);

  const [showResources, setShowResources] = useState(false);
  const [showAdditionalContext, setShowAdditionalContext] = useState(false);
  return (
    <div
      className={` z-0  relative ${
        fullscreen
          ? "!h-[150px] mb-4 !max-h-[450px]"
          : "py-6  max-w-3xl mx-auto !max-h-[500px] "
      } 
        ${answer && "h-[500px] mb-4"}`}
    >
      <div
        className={`transition-all overflow-y-auto duration-300 h-full ease-in-out bg-white dark:bg-gray-900 
                    `}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Qure Clinical Assistant
          </h1>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded shadow-sm transition"
              onClick={() => setShowAdditionalContext(!showAdditionalContext)}
            >
              {showAdditionalContext ? "Hide Context" : "Add Context"}
            </button>
            <button
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded shadow-sm transition"
              onClick={() => setShowResources(!showResources)}
            >
              Manage Resources
            </button>
          </div>
        </div>

        {/* Context Input */}
        {showAdditionalContext && (
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Enter patient context (e.g., history, diagnosis, symptoms)"
            className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-800 dark:text-white resize-none shadow-sm"
            rows={4}
          />
        )}

        {/* Question Input */}
        <div className="flex gap-2 items-start mb-6">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a clinical question..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-800 dark:text-white shadow-sm"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className={`px-4 py-2 rounded text-white font-medium shadow-sm transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Asking..." : "Ask"}
          </button>
        </div>

        {/* Answer Section */}
        {answer && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-400">
              🩺 Answer
            </h2>
            <ReactMarkdown>{answer}</ReactMarkdown>

            {/* Citations */}
            {citations?.length > 0 && (
              <>
                <h3 className="mt-4 font-semibold text-gray-700 dark:text-gray-300">
                  📚 Citations
                </h3>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {citations?.map((c, i) => (
                    <li key={i}>{c.pageContent}...</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Modal for PDF Upload */}
        {showResources && <PdfUpload onClose={() => setShowResources(false)} />}
      </div>
      {answer && fullscreen && (
        <div className="absolute -bottom-4 -z-10 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setFullscreen(false)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-600 hover:bg-gray-800 text-white rounded-full shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      {answer && !fullscreen && (
        <div className="absolute bottom-1  left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-2 border border-gray-600 px-3 py-2 bg-gray-800 hover:bg-gray-800 text-white rounded-full shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 17a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 14.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 17z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
