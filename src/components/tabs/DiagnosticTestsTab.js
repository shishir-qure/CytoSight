import { BsStars } from "react-icons/bs";

export default function DiagnosticTestsTab({ diagnosticTests }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Diagnostic Tests</h2>

        <div className="space-y-6">
          {diagnosticTests.map((test, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{test?.name}</h3>
                  <div className="text-gray-400 text-sm mb-2">{test?.date}</div>
                  <div className="text-gray-300 text-sm">Status: {test?.status}</div>
                  {test?.findings && (
                    <div className="text-gray-300 text-sm mt-2">
                      Findings: {test?.findings}
                    </div>
                  )}
                  {test.values && (
                    <div className="text-gray-300 text-sm mt-2">{test?.values}</div>
                  )}
                </div>
                {/* <div className="flex flex-col space-y-2">
                  {test.priority === "Critical" && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <span className="mr-1">⚠️</span>
                      Critical
                    </span>
                  )}
                  {test.status === "Abnormal" && (
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <span className="mr-1">⚠️</span>
                      Abnormal
                    </span>
                  )}
                  {test.status === "Impaired" && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <span className="mr-1">⚠️</span>
                      Impaired
                    </span>
                  )}
                  {test.status === "Normal" && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <span className="mr-1">✓</span>
                      Normal
                    </span>
                  )}
                </div> */}
              </div>

              {/* Staff Information */}
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-400">Technician: </span>
                  <span className="text-gray-300">{test?.technician}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">
                    {test?.radiologist
                      ? "Radiologist: "
                      : test?.pathologist
                      ? "Pathologist: "
                      : test?.pulmonologist
                      ? "Pulmonologist: "
                      : test?.cardiologist
                      ? "Cardiologist: "
                      : "Physician: "}
                  </span>
                  <span className="text-gray-300">
                    {test?.radiologist ||
                      test?.pathologist ||
                      test?.pulmonologist ||
                      test?.cardiologist}
                  </span>
                </div>
              </div>

              {test?.aiFindings && test?.aiFindings?.length > 0 && (
                <div className="bg-teal-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <BsStars className="text-yellow-500" />
                    <span className="text-gray-300 font-semibold">AI Key Findings:</span>
                  </div>
                  <ul className="space-y-2">
                    {test?.aiFindings.map((finding, findingIndex) => (
                      <li key={findingIndex} className="text-gray-100 text-sm">
                        • {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {test.aiAnalysis && (
                <div className="bg-yellow-900 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <span className="mr-2">🤖</span>
                    <span className="text-yellow-300 font-semibold">AI Analysis:</span>
                  </div>
                  <ul className="space-y-2">
                    {test.aiAnalysis.map((analysis, analysisIndex) => (
                      <li key={analysisIndex} className="text-yellow-200 text-sm">
                        • {analysis}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
