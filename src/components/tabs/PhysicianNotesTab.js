export default function PhysicianNotesTab() {
  const notes = [
    {
      title: "Progress Note - Pulmonology",
      date: "Jun 10, 2025 - Dr. Sarah Smith",
      content:
        "Patient returns for follow-up of asthma. Reports improved symptoms since starting inhaled corticosteroid. PFT shows improvement in FEV1 from 55% to 65% predicted. Patient demonstrates proper inhaler technique. Continues to have occasional dyspnea with exertion but overall functional status improved. No recent exacerbations. Compliance with medications excellent.",
      aiKeyPoints: [
        "Treatment Response: Good response to inhaled corticosteroids",
        "Symptom Improvement: Decreased wheezing and dyspnea",
        "Medication Compliance: Patient adherent to therapy",
        "Functional Status: Improved exercise tolerance",
        "Next Steps: Continue current regimen, follow-up in 3 months",
      ],
      type: "progress",
    },
    {
      title: "Emergency Department Note",
      date: "Jun 8, 2025 - Dr. Michael Johnson",
      content:
        "Patient presented with acute chest pain. Workup including EKG, troponins, and chest X-ray were normal. Discharged home with follow-up. 45-year-old male presents to ED with acute onset chest pain, described as sharp, non-radiating, 6/10 severity. Pain started approximately 2 hours ago while at rest. No associated shortness of breath, nausea, or diaphoresis. Vital signs stable. Physical examination unremarkable. EKG shows normal sinus rhythm, no ST changes. Troponin I negative x2. Chest X-ray clear. Given clinical presentation and negative workup, diagnosis of atypical chest pain, likely musculoskeletal etiology.",
      aiSummary: [
        "Chief Complaint: Acute chest pain, 6/10 severity",
        "Workup: EKG normal, Troponins negative, CXR clear",
        "Assessment: Atypical chest pain, likely musculoskeletal",
        "Disposition: Discharged with cardiology follow-up",
        "Red Flags: None - cardiac causes ruled out",
      ],
      type: "emergency",
    },
    {
      title: "Radiology Report - CT Chest",
      date: "Jun 10, 2025 - Dr. Lisa Chen, Radiologist",
      content:
        "CT chest without contrast demonstrates bilateral lower lobe consolidation with air bronchograms. New 1.2cm nodule in right upper lobe compared to prior study from May 2025. Mediastinal lymphadenopathy with nodes measuring up to 1.5cm in short axis. Small bilateral pleural effusions. Heart size normal. No pneumothorax. Osseous structures intact.",
      criticalFindings: [
        "Pneumonia: Bilateral lower lobe consolidation",
        "New Nodule: 1.2cm solid nodule, RUL - concerning for malignancy",
        "Lymphadenopathy: Mediastinal nodes enlarged (>1cm)",
        "Pleural Effusion: Small bilateral effusions",
        "Recommendation: PET-CT for nodule characterization",
      ],
      type: "radiology",
    },
    {
      title: "Cardiology Consultation",
      date: "Jun 5, 2025 - Dr. Emily Chen, Cardiologist",
      content:
        "Patient referred for evaluation of hypertension and chest pain. Blood pressure well controlled on current ACE inhibitor therapy. Echocardiogram shows normal left ventricular function with EF 60%. No wall motion abnormalities. Mild mitral regurgitation noted. Stress test negative for ischemia. Continue current antihypertensive regimen.",
      aiKeyPoints: [
        "Blood Pressure: Well controlled on ACE inhibitor",
        "Cardiac Function: Normal LV function, EF 60%",
        "Stress Test: Negative for ischemia",
        "Valvular Disease: Mild mitral regurgitation",
        "Plan: Continue current medications, annual follow-up",
      ],
      type: "cardiology",
    },
    {
      title: "Discharge Summary - Internal Medicine",
      date: "Jun 3, 2025 - Dr. Robert Wilson",
      content:
        "Patient admitted for pneumonia management. Treated with IV antibiotics for 3 days with good clinical response. Chest X-ray shows improvement in bilateral infiltrates. Patient afebrile for 24 hours. Oxygen saturation stable on room air. Discharged on oral antibiotics to complete 7-day course. Follow-up arranged with primary care in 1 week.",
      aiSummary: [
        "Admission Diagnosis: Community-acquired pneumonia",
        "Treatment: IV antibiotics x3 days, then oral",
        "Clinical Response: Afebrile, improved oxygenation",
        "Imaging: Chest X-ray shows improvement",
        "Disposition: Discharged home with oral antibiotics",
      ],
      type: "discharge",
    },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Physician Notes</h2>

        <div className="space-y-8">
          {notes.map((note, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{note.title}</h3>
                <div className="text-gray-400 text-sm mb-4">{note.date}</div>
                <p className="text-gray-300 mb-4 leading-relaxed">{note.content}</p>

                {note.type === "progress" && note.aiKeyPoints && (
                  <div className="bg-green-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="mr-2">🤖</span>
                      <span className="text-green-300 font-semibold">AI Key Points:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.aiKeyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-green-200 text-sm">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {note.type === "emergency" && note.aiSummary && (
                  <div className="bg-blue-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="mr-2">🤖</span>
                      <span className="text-blue-300 font-semibold">AI Summary:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.aiSummary.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-blue-200 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {note.type === "radiology" && note.criticalFindings && (
                  <div className="bg-red-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="mr-2">🤖</span>
                      <span className="text-red-300 font-semibold">Critical Findings:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.criticalFindings.map((finding, findingIndex) => (
                        <li key={findingIndex} className="text-red-200 text-sm">
                          • {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {note.type === "cardiology" && note.aiKeyPoints && (
                  <div className="bg-purple-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="mr-2">🤖</span>
                      <span className="text-purple-300 font-semibold">AI Key Points:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.aiKeyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-purple-200 text-sm">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {note.type === "discharge" && note.aiSummary && (
                  <div className="bg-indigo-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="mr-2">🤖</span>
                      <span className="text-indigo-300 font-semibold">AI Summary:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.aiSummary.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-indigo-200 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="text-blue-400 hover:text-blue-300 text-sm mt-4">
                  {note.type === "radiology" ? "Read full report" : "Read full note"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
