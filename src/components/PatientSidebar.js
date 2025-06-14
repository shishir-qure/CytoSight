import Link from "next/link"

export default function PatientSidebar({ patients, currentPatientId }) {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
       <div className="flex items-center justify-between pt-6 px-4">
          <h1 className="text-lg font-semibold">Worklist</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">⚙️</span>
            <span className="text-gray-400">🔔</span>
        </div>
      </div>
      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or filter patients"
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <span className="absolute right-3 top-2.5 text-gray-400">🔽</span>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-400">Review Negative CXR</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-400">Positive Scans</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-400">{patients.length} Patients</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
      </div>

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto">
        {patients.map((patient) => (
          <Link key={patient.id} href={`/patients/${patient.id}`}>
            <div
              className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer relative ${
                currentPatientId === patient.id ? "bg-gray-700" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">👤</div>
                <div className="flex-1">
                  <div className="font-semibold">{patient.name}</div>
                  <div className="text-sm text-gray-400">{patient.age}</div>
                  <div className="text-xs text-gray-500 mt-1">{patient.code}</div>
                  <div className="text-xs text-gray-500">{patient.workspace}</div>
                  <div className="text-xs text-gray-500">{patient.date}</div>
                </div>
                {patient.hasAlert && <div className="w-3 h-3 bg-red-500 rounded-full absolute top-4 right-4"></div>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
