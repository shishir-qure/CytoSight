export default function DiagnosticTestsTab() {
  const tests = [
    {
      name: "Chest CT",
      date: "Jun 10, 2025 15:30",
      status: "Complete",
      priority: "Critical",
      findings: "Bilateral lower lobe consolidation consistent with pneumonia",
      aiFindings: [
        "Bilateral pneumonia - requires immediate treatment",
        "New 1.2cm nodule in right upper lobe - needs follow-up",
        "Pleural effusion - small bilateral",
        "Mediastinal lymphadenopathy - concerning for malignancy",
      ],
      technician: "RT Sarah Johnson",
      radiologist: "Dr. Michael Chang",
    },
    {
      name: "Arterial Blood Gas",
      date: "Jun 10, 2025 11:00",
      status: "Abnormal",
      values: "pO2: 85 mmHg, pCO2: 42 mmHg, pH: 7.38",
      aiAnalysis: [
        "Mild hypoxemia - pO2 slightly low (normal: >95 mmHg)",
        "Compensated respiratory acidosis - pH within normal range",
        "Oxygen therapy indicated - consider supplemental O2",
      ],
      technician: "Lab Tech Maria Rodriguez",
      pathologist: "Dr. James Kim",
    },
    {
      name: "Pulmonary Function Test",
      date: "Jun 10, 2025 10:30",
      status: "Impaired",
      findings: "FEV1: 65% predicted, FVC: 78% predicted",
      aiAnalysis: [
        "Moderate obstructive pattern - consistent with COPD/Asthma",
        "Reduced FEV1 - indicates airway obstruction",
        "Bronchodilator response - 15% improvement post-albuterol",
      ],
      technician: "PFT Tech David Lee",
      pulmonologist: "Dr. Sarah Smith",
    },
    {
      name: "Complete Blood Count",
      date: "Jun 9, 2025 08:00",
      status: "Abnormal",
      values: "WBC: 12.5 K/μL, RBC: 4.2 M/μL, Hgb: 11.8 g/dL, Plt: 450 K/μL",
      aiAnalysis: [
        "Elevated white blood cell count - suggests infection or inflammation",
        "Mild anemia - hemoglobin below normal range",
        "Thrombocytosis - elevated platelet count may indicate inflammation",
      ],
      technician: "Lab Tech Jennifer Park",
      pathologist: "Dr. Robert Chen",
    },
    {
      name: "Basic Metabolic Panel",
      date: "Jun 9, 2025 08:00",
      status: "Normal",
      values:
        "Na: 140 mEq/L, K: 4.2 mEq/L, Cl: 102 mEq/L, CO2: 24 mEq/L, BUN: 18 mg/dL, Cr: 1.0 mg/dL, Glucose: 95 mg/dL",
      aiAnalysis: [
        "All electrolytes within normal limits",
        "Kidney function normal - creatinine and BUN appropriate",
        "Blood glucose normal - no diabetes concerns",
      ],
      technician: "Lab Tech Michael Wong",
      pathologist: "Dr. Lisa Thompson",
    },
    {
      name: "Echocardiogram",
      date: "Jun 8, 2025 14:00",
      status: "Normal",
      findings: "Normal left ventricular function, EF 60%",
      aiAnalysis: [
        "Normal cardiac function - ejection fraction within normal range",
        "No wall motion abnormalities detected",
        "Normal valve function - no significant regurgitation or stenosis",
      ],
      technician: "Echo Tech Amanda Davis",
      cardiologist: "Dr. Emily Chen",
    },
    {
      name: "Urinalysis",
      date: "Jun 7, 2025 09:30",
      status: "Normal",
      values: "Color: Yellow, Clarity: Clear, Protein: Negative, Glucose: Negative, Ketones: Negative",
      aiAnalysis: [
        "Normal urinalysis - no signs of infection",
        "No proteinuria - kidney function appears normal",
        "No glucosuria - blood sugar control adequate",
      ],
      technician: "Lab Tech Kevin Martinez",
      pathologist: "Dr. Susan Lee",
    },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Diagnostic Tests</h2>

        <div className="space-y-6">
          {tests.map((test, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{test.name}</h3>
                  <div className="text-gray-400 text-sm mb-2">{test.date}</div>
                  <div className="text-gray-300 text-sm">Status: {test.status}</div>
                  {test.findings && <div className="text-gray-300 text-sm mt-2">Findings: {test.findings}</div>}
                  {test.values && <div className="text-gray-300 text-sm mt-2">{test.values}</div>}
                </div>
                <div className="flex flex-col space-y-2">
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
                </div>
              </div>

              {/* Staff Information */}
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-400">Technician: </span>
                  <span className="text-gray-300">{test.technician}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">
                    {test.radiologist
                      ? "Radiologist: "
                      : test.pathologist
                        ? "Pathologist: "
                        : test.pulmonologist
                          ? "Pulmonologist: "
                          : test.cardiologist
                            ? "Cardiologist: "
                            : "Physician: "}
                  </span>
                  <span className="text-gray-300">
                    {test.radiologist || test.pathologist || test.pulmonologist || test.cardiologist}
                  </span>
                </div>
              </div>

              {test.aiFindings && (
                <div className="bg-red-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <span className="mr-2">🤖</span>
                    <span className="text-red-300 font-semibold">AI Key Findings:</span>
                  </div>
                  <ul className="space-y-2">
                    {test.aiFindings.map((finding, findingIndex) => (
                      <li key={findingIndex} className="text-red-200 text-sm">
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
  )
}
