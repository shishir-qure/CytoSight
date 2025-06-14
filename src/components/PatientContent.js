"use client";

import ChatTab from "./tabs/ChatTab";
import VitalsTab from "./tabs/VitalsTab";
import EncountersTab from "./tabs/EncountersTab";
import PhysicianNotesTab from "./tabs/PhysicianNotesTab";
import DiagnosticTestsTab from "./tabs/DiagnosticTestsTab";
import PatientSummaryTab from "./tabs/PatientSummaryTab";
import RiskTab from "./tabs/RiskTab";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import useMicrophone from "@/hooks/useMicrophone";

const tabs = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "vitals", label: "Vitals", icon: "📊" },
  { id: "risk", label: "Risk", icon: "🔍" },
  { id: "encounters", label: "Encounters", icon: "📋" },
  { id: "notes", label: "Physician Notes", icon: "📝" },
  { id: "tests", label: "Diagnostic Tests", icon: "🔬" },
  { id: "summary", label: "Patient Summary", icon: "👤" },
];

export default function PatientContent({
  patient,
  activeTab,
  setActiveTab,
  currentPatient,
}) {
  const { toggleRecording, isRecording } = useMicrophone(activeTab);
  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex flex-col space-y-4 bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">{currentPatient.name}</span>
            <span className="text-gray-400">{currentPatient.status}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg text-sm">
              Add to Tumor Board
            </button>
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

          <button onClick={toggleRecording} className="ml-auto px-4 py-2 cursor-pointer">
            {!isRecording ? (
              <FaMicrophoneSlash className="text-gray-400 w-6 h-6" />
            ) : (
              <FaMicrophone className="text-gray-100 w-6 h-6" />
            )}
          </button>
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
        {activeTab === "risk" && <RiskTab />}
      </div>
    </div>
  );
}
