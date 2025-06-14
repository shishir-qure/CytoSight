"use client"

import ChatTab from "./tabs/ChatTab"
import VitalsTab from "./tabs/VitalsTab"
import EncountersTab from "./tabs/EncountersTab"
import PhysicianNotesTab from "./tabs/PhysicianNotesTab"
import DiagnosticTestsTab from "./tabs/DiagnosticTestsTab"
import PatientSummaryTab from "./tabs/PatientSummaryTab"

const tabs = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "vitals", label: "Vitals", icon: "📊" },
  { id: "encounters", label: "Encounters", icon: "📋" },
  { id: "notes", label: "Physician Notes", icon: "📝" },
  { id: "tests", label: "Diagnostic Tests", icon: "🔬" },
  { id: "summary", label: "Patient Summary", icon: "👤" },
]

export default function PatientContent({ patient, activeTab, setActiveTab, currentPatient }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex flex-col space-y-4 bg-gray-800 p-4 border-b border-gray-700">
         <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">{currentPatient.name}</span>
             <span className="text-gray-400">{currentPatient.status}</span>
          </div>
          <div className="flex items-center space-x-4">
             <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
            👤 Add to Tumor Board
          </button>
          <span className="text-gray-400">Studies 2</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">⚙️</span>
            <span className="text-gray-400">🔔</span>
         </div>
          </div>
        </div>
      {/* Patient Info Header */}
      <div className="">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Current Visit: {patient.currentVisit}
          </span>
          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">Previous: {patient.previous}</span>
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            Active Problems: {patient.activeProblems}
          </span>
        </div>
        <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm inline-block">
          Alerts: {patient.alerts}
        </div>
      </div>
     </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 bg-gray-800">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400 bg-gray-800"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && <ChatTab patient={patient} />}
        {activeTab === "vitals" && <VitalsTab />}
        {activeTab === "encounters" && <EncountersTab />}
        {activeTab === "notes" && <PhysicianNotesTab />}
        {activeTab === "tests" && <DiagnosticTestsTab />}
        {activeTab === "summary" && <PatientSummaryTab />}
      </div>
    </div>
  )
}
