export default function VitalsTab() {
  const vitals = [
    {
      name: "Blood Pressure",
      value: "135/85 mmHg",
      lastUpdated: "2 hours ago",
      status: "normal",
    },
    {
      name: "Heart Rate",
      value: "72 bpm",
      lastUpdated: "2 hours ago",
      status: "normal",
    },
    {
      name: "Temperature",
      value: "99.2°F",
      lastUpdated: "1 hour ago",
      status: "normal",
    },
    {
      name: "Oxygen Saturation",
      value: "98%",
      lastUpdated: "1 hour ago",
      status: "normal",
    },
    {
      name: "Respiratory Rate",
      value: "16/min",
      lastUpdated: "1 hour ago",
      status: "normal",
    },
    {
      name: "Weight",
      value: "185 lbs",
      lastUpdated: "6 hours ago",
      status: "normal",
    },
    {
      name: "Height",
      value: "5'10\"",
      lastUpdated: "1 week ago",
      status: "normal",
    },
    {
      name: "BMI",
      value: "26.5",
      lastUpdated: "6 hours ago",
      status: "normal",
    },
    {
      name: "Pain Scale",
      value: "3/10",
      lastUpdated: "30 minutes ago",
      status: "elevated",
    },
    {
      name: "Blood Glucose",
      value: "145 mg/dL",
      lastUpdated: "4 hours ago",
      status: "critical",
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Vital Signs</h2>
          <div className="flex space-x-3">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <span>📋</span>
              <span>Send to EMR</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {vitals.map((vital, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center">
                    {vital.name}
                    <span className="ml-2 text-2xl">{vital.trend}</span>
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Last updated: {vital.lastUpdated}
                  </p>
                </div>
                <div
                  className={`text-2xl font-bold ${
                    vital.status === "elevated"
                      ? "text-yellow-400"
                      : vital.status === "critical"
                      ? "text-red-400"
                      : "text-gray-100"
                  }`}
                >
                  {vital.value}
                </div>
              </div>

              {/* Trend History */}
              {/* <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Recent History:
                </h4>
                <div className="flex space-x-2">
                  {vital.history.map((value, historyIndex) => (
                    <span
                      key={historyIndex}
                      className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          ))}
        </div>

        {/* Additional Monitoring Section */}
        {/* <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-6">Continuous Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Cardiac Monitor</h4>
              <p className="text-gray-400 text-sm">Normal sinus rhythm</p>
              <p className="text-green-400 text-sm">No arrhythmias detected</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Pulse Oximetry</h4>
              <p className="text-gray-400 text-sm">Continuous monitoring</p>
              <p className="text-green-400 text-sm">Stable oxygen levels</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
