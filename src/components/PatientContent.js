"use client";

import { useState, useEffect } from "react";
import ChatTab from "./tabs/ChatTab";
import VitalsTab from "./tabs/VitalsTab";
import EncountersTab from "./tabs/EncountersTab";
import PhysicianNotesTab from "./tabs/PhysicianNotesTab";
import DiagnosticTestsTab from "./tabs/DiagnosticTestsTab";
import PatientSummaryTab from "./tabs/PatientSummaryTab";
import RiskTab from "./tabs/RiskTab";
import {
  FaCheckCircle,
  FaComments,
  FaNotesMedical,
  FaFileMedicalAlt,
} from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosMedical } from "react-icons/io";
import { CiMedicalCross } from "react-icons/ci";
import { FaBookMedical } from "react-icons/fa6";
import { GiArchiveResearch } from "react-icons/gi";
import QuickSearch from "./QuickSearch";
import Toast from "./Toast";
import classNames from "classnames";

const tabs = [
  { id: "chat", label: "Chat", icon: <FaComments /> },
  { id: "vitals", label: "Vitals", icon: <FaFileMedicalAlt /> },
  { id: "risk", label: "Risk", icon: <IoIosMedical /> },
  { id: "encounters", label: "Encounters", icon: <TbActivityHeartbeat /> },
  { id: "notes", label: "Physician Notes", icon: <FaNotesMedical /> },
  { id: "tests", label: "Diagnostic Tests", icon: <CiMedicalCross /> },
  { id: "summary", label: "Patient Summary", icon: <FaBookMedical /> },
  { id: "quickResearch", label: "Quick Research", icon: <GiArchiveResearch /> },
];

export default function PatientContent({
  activeTab,
  setActiveTab,
  currentPatient,
  currentPatientVisit,
  setCurrentPatient,
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (currentPatient?.patient?.id) {
      setIsSuccess(false);
    }
  }, [currentPatient?.patient?.id]);

  const handleAddToTumorBoard = () => {
    const fetchTumorBoard = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/patients/${currentPatient?.patient?.id}/add_to_tumor_board/`,
          {
            method: "POST",
          }
        );
        await response.json();
        setIsSuccess(true);
        Toast.success("Patient added to tumor board");
      } catch (error) {
        console.log(error);
      }
    };
    fetchTumorBoard();
  };
  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex flex-col space-y-4 bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">{currentPatient?.patient?.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddToTumorBoard}
              className={classNames(
                "bg-teal-700 hover:bg-teal-800 px-4 py-2 flex items-center space-x-2 rounded-lg text-sm cursor-pointer",
                {
                  "!bg-red-800":
                    currentPatient?.patient?.added_to_tumor_board || isSuccess,
                }
              )}
              disabled={currentPatient?.patient?.added_to_tumor_board || isSuccess}
            >
              {(currentPatient?.patient?.added_to_tumor_board || isSuccess) && (
                <FaCheckCircle />
              )}
              <p>
                {currentPatient?.patient?.added_to_tumor_board || isSuccess
                  ? "Added to Tumor Board"
                  : "Add to Tumor Board"}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 bg-gray-800">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-400 bg-gray-800"
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
        {activeTab === "chat" && <ChatTab currentPatient={currentPatient} />}
        {activeTab === "vitals" && (
          <VitalsTab
            vitals={currentPatientVisit[currentPatientVisit.length - 1]?.observations}
          />
        )}
        {activeTab === "encounters" && (
          <EncountersTab encounters={currentPatient?.visit_encounters} />
        )}
        {activeTab === "notes" && (
          <PhysicianNotesTab physicianNotes={currentPatient?.clinical_notes} />
        )}
        {activeTab === "tests" && (
          <DiagnosticTestsTab diagnosticTests={currentPatient?.diagnostic_tests} />
        )}
        {activeTab === "summary" && (
          <PatientSummaryTab summary={currentPatient?.patient_summary} />
        )}
        {activeTab === "risk" && (
          <RiskTab riskAssessment={currentPatient?.risk_assessment} />
        )}
        {activeTab === "quickResearch" && (
          <QuickSearch
            currentPatient={currentPatient}
            setCurrentPatient={setCurrentPatient}
          />
        )}
      </div>
    </div>
  );
}
