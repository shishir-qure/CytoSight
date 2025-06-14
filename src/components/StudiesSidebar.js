export default function StudiesSidebar() {
  const studies = [
    {
      id: 1,
      type: "CT Chest",
      status: "w/o Contrast",
      date: "Jun 10, 2025",
      time: "15:30",
      series: "1",
      images: "120",
      size: "45.2 MB",
      priority: "Critical",
      complete: true,
      findings: ["New 1.2cm nodule (RUL)", "Bilateral pneumonia", "Mediastinal lymphadenopathy"],
      videos: [
        { name: "Nodule (Axial)", icon: "▶️" },
        { name: "Pneumonia", icon: "▶️" },
        { name: "Lymph Nodes", icon: "▶️" },
        { name: "3D Render", icon: "▶️" },
      ],
      description: "Bilateral lower lobe consolidation. Lung nodule identified in RUL.",
      actions: ["View", "Report"],
    },
    {
      id: 2,
      type: "CT Chest",
      status: "(Prior)",
      date: "May 15, 2025",
      time: "14:20",
      series: "1",
      images: "115",
      size: "42.8 MB",
      priority: "Baseline",
      complete: true,
      comparison: ["No nodule present (NEW finding on current study)", "Lungs clear bilaterally", "Normal mediastinum"],
      slices: [
        { name: "RUL Normal", icon: "▶️" },
        { name: "Clear Lungs", icon: "▶️" },
      ],
      description: "Comparison study. Stable pulmonary nodules. No acute findings.",
      actions: ["View", "Report"],
    },
    {
      id: 3,
      type: "Chest X-ray (2 Views)",
      date: "Jun 10, 2025",
      time: "09:45",
      series: "2",
      images: "2",
      size: "8.4 MB",
      priority: "Abnormal",
      complete: true,
      aiAnalysis: [
        "Bilateral lower lobe infiltrates",
        "Possible pleural effusion (L)",
        "Heart size within normal limits",
      ],
      keyImages: [
        { name: "PA View", icon: "👁️" },
        { name: "Lateral View", icon: "👁️" },
      ],
      description: "PA and Lateral views. Bilateral infiltrates noted.",
      actions: ["View", "Report"],
    },
    {
      id: 4,
      type: "Echocardiogram",
      date: "Jun 9, 2025",
      time: "11:30",
      series: "1",
      images: "45",
      size: "125.6 MB",
      priority: "Normal",
      complete: true,
      aiAnalysis: [
        "Normal left ventricular function (EF 60%)",
        "No wall motion abnormalities",
        "Mild mitral regurgitation",
      ],
      keyImages: [
        { name: "Parasternal Long", icon: "▶️" },
        { name: "Apical 4-Chamber", icon: "▶️" },
      ],
      description: "Transthoracic echocardiogram. Normal cardiac function.",
      actions: ["View", "Report"],
    },
  ]

  return (
    <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Patient Studies</h2>
        <p className="text-sm text-gray-400">Auto-retrieved via PACS connection</p>
      </div>

      <div className="p-4 space-y-6">
        {studies.map((study) => (
          <div key={study.id} className="bg-gray-700 rounded-lg p-4">
            {/* Study Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  {study.type.includes("CT") && <span className="text-white text-sm">📊</span>}
                  {study.type.includes("X-ray") && <span className="text-white text-sm">📷</span>}
                  {study.type.includes("Echo") && <span className="text-white text-sm">❤️</span>}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{study.type}</h3>
                  <p className="text-sm text-gray-400">{study.status}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {study.date} {study.time}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                {study.priority === "Critical" && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">🔴 Critical</span>
                )}
                {study.priority === "Baseline" && (
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">✅ Baseline</span>
                )}
                {study.priority === "Abnormal" && (
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">⚠️ Abnormal</span>
                )}
                {study.priority === "Normal" && (
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">✅ Normal</span>
                )}
                {study.complete && <span className="text-green-400 text-xs">Complete</span>}
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              Series: {study.series} | Images: {study.images} | Size: {study.size}
            </div>

            {/* AI Findings */}
            {study.findings && (
              <div className="bg-red-900 rounded-lg p-3 mb-4">
                <div className="text-red-300 font-semibold text-sm mb-2">🤖 AI Key Findings:</div>
                <ul className="text-xs text-red-200 space-y-1">
                  {study.findings.map((finding, index) => (
                    <li key={index}>• {finding}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Comparison */}
            {study.comparison && (
              <div className="bg-green-900 rounded-lg p-3 mb-4">
                <div className="text-green-300 font-semibold text-sm mb-2">🤖 AI Comparison:</div>
                <ul className="text-xs text-green-200 space-y-1">
                  {study.comparison.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Analysis */}
            {study.aiAnalysis && (
              <div className="bg-orange-900 rounded-lg p-3 mb-4">
                <div className="text-orange-300 font-semibold text-sm mb-2">🤖 AI Analysis:</div>
                <ul className="text-xs text-orange-200 space-y-1">
                  {study.aiAnalysis.map((analysis, index) => (
                    <li key={index}>• {analysis}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Slice Videos */}
            {study.videos && (
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2 text-gray-300">🎬 Key Slice Videos (AI Generated):</div>
                <div className="grid grid-cols-2 gap-2">
                  {study.videos.map((video, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-600 p-2 rounded text-xs flex items-center space-x-1 text-gray-300"
                    >
                      <span>{video.icon}</span>
                      <span>{video.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Slices (Normal Study) */}
            {study.slices && (
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2 text-gray-300">🎬 Key Slices (Normal Study):</div>
                <div className="grid grid-cols-2 gap-2">
                  {study.slices.map((slice, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-600 p-2 rounded text-xs flex items-center space-x-1 text-gray-300"
                    >
                      <span>{slice.icon}</span>
                      <span>{slice.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Images */}
            {study.keyImages && (
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2 text-gray-300">🖼️ Key Images:</div>
                <div className="grid grid-cols-2 gap-2">
                  {study.keyImages.map((image, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-600 p-2 rounded text-xs flex items-center space-x-1 text-gray-300"
                    >
                      <span>{image.icon}</span>
                      <span>{image.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="text-sm text-gray-300 mb-4">{study.description}</div>

            {/* Actions */}
            <div className="flex space-x-2">
              {study.actions.map((action, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded text-sm ${
                    action === "View"
                      ? "bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1"
                      : "bg-gray-600 hover:bg-gray-500 text-white"
                  }`}
                >
                  {action === "View" && <span>👁️</span>}
                  <span>{action}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
