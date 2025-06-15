export default function VitalsTab({ vitals }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Vital Signs</h2>
          <div className="flex space-x-3"></div>
        </div>

        <div className="space-y-4">
          {vitals?.length > 0 &&
            vitals?.map((vital, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold uppercase text-white mb-1 flex items-center">
                      {vital?.focus?.split(":")[0]}
                    </h3>
                    {/* <p className="text-gray-400 text-sm">
                    Last updated:{" "}
                    {format(
                      new Date(vitalsData?.scheduled_at?.split("T")[0]),
                      "MMM d, yyyy"
                    )}
                  </p> */}
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      vital?.status === "elevated"
                        ? "text-yellow-400"
                        : vital.status === "critical"
                        ? "text-red-400"
                        : "text-gray-100"
                    }`}
                  >
                    {vital?.focus?.split(":")[1]}
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
