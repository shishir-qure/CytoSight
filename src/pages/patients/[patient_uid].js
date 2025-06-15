"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import PatientContent from "../../components/PatientContent";
import StudiesSidebar from "../../components/StudiesSidebar";
import DropdownMenu from "../../components/common/DropdownMenu";
import { BsStars } from "react-icons/bs";
import AIAssistantWidget from "../../components/common/AIAssistantWidget";

export default function PatientPage() {
  const router = useRouter();
  const { patient_uid } = router.query;
  const [activeTab, setActiveTab] = useState("chat");
  const [patientData, setPatientData] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentPatientVisit, setCurrentPatientVisit] = useState(null);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/patients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPatientData(data?.data);
      // const first_patient = data?.data[0];
      // router.push(`/patients/${patient_uid ?? first_patient?.id}`);
    } catch (error) {
      console.log("error-here", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  useEffect(() => {
    const fetchSelectedPatientData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/patients/${patient_uid}`);
        const data = await response.json();
        setCurrentPatient(data?.data);
        setCurrentPatientVisit(data?.data?.visits);
      } catch (error) {
        console.log("error-here", error);
      }
    };
    if (patient_uid) {
      fetchSelectedPatientData();
    }
  }, [patient_uid]);

  const handleAdd = async (type) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/create-${type}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data?.status === "success") {
        fetchPatientData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addOptions = [
    {
      title: "Normal patient",
      onClick: () => {
        handleAdd("normal");
      },
    },
    {
      title: "Sick patient",
      onClick: () => {
        handleAdd("lung-related");
      },
    },
    {
      title: "Lung cancer patient",
      onClick: () => {
        handleAdd("lung-cancer");
      },
    },
    // {
    //   title: `Run AI task for this patient`,
    //   icon: <BsStars className="text-yellow-400" />,
    //   onClick: () => {},
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/qureLogo.svg" alt="Qure" className="w-20 h-10" />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu title="Add" options={addOptions} />
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Patients List */}
        <PatientSidebar
          patients={patientData}
          setPatientData={setPatientData}
          currentPatientId={patient_uid}
        />

        {/* Center Content */}
        <PatientContent
          patient={currentPatient}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentPatient={currentPatient}
          currentPatientVisit={currentPatientVisit}
          setCurrentPatient={setCurrentPatient}
        />

        {/* Right Sidebar - Studies */}
        <StudiesSidebar patient_uid={patient_uid} />
      </div>
      <AIAssistantWidget
        setCurrentPatient={setCurrentPatient}
        currentPatient={currentPatient}
      />
    </div>
  );
}
