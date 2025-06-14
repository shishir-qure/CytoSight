"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PatientSidebar from "../../components/PatientSidebar";
import PatientContent from "../../components/PatientContent";
import StudiesSidebar from "../../components/StudiesSidebar";

// Sample patient data - Add more patients
const patientsData = {
  "anon-116y-m": {
    id: "anon-116y-m",
    name: "ANON | 116Y M",
    age: "116 years",
    gender: "Male",
    status: "qtrack_release_us...",
    currentVisit: "Pulmonary Follow-up",
    previous: "Pneumonia, COPD Exacerbation",
    activeProblems: "Asthma, Lung Nodules, HTN",
    alerts: "Drug Allergy (Penicillin), Fall Risk",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Has Other Significant Comorbidities",
    orderingDepartment: "Inpatient Department (IPD)",
  },
  "anon-52y-m": {
    id: "anon-52y-m",
    name: "ANON | 52Y M",
    age: "52 years",
    gender: "Male",
    status: "qtrack_release_us...",
    currentVisit: "Routine Checkup",
    previous: "Hypertension",
    activeProblems: "Diabetes, HTN",
    alerts: "None",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Stable",
    orderingDepartment: "Outpatient Department (OPD)",
  },
  "anon-67y-f": {
    id: "anon-67y-f",
    name: "ANON | 67Y F",
    age: "67 years",
    gender: "Female",
    status: "qtrack_release_us...",
    currentVisit: "Cardiology Consultation",
    previous: "Myocardial Infarction",
    activeProblems: "CAD, CHF, Diabetes",
    alerts: "Contrast Allergy (Iodine)",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Chronic Conditions Managed",
    orderingDepartment: "Cardiology Department",
  },
  "anon-34y-f": {
    id: "anon-34y-f",
    name: "ANON | 34Y F",
    age: "34 years",
    gender: "Female",
    status: "qtrack_release_us...",
    currentVisit: "Emergency Department",
    previous: "Appendectomy",
    activeProblems: "Acute Abdominal Pain",
    alerts: "Pregnancy - First Trimester",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Acute Care Required",
    orderingDepartment: "Emergency Department",
  },
  "anon-78y-m": {
    id: "anon-78y-m",
    name: "ANON | 78Y M",
    age: "78 years",
    gender: "Male",
    status: "qtrack_release_us...",
    currentVisit: "Oncology Follow-up",
    previous: "Lung Cancer Surgery",
    activeProblems: "Lung Cancer, COPD, HTN",
    alerts: "Chemotherapy Patient",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Cancer Treatment Active",
    orderingDepartment: "Oncology Department",
  },
  "anon-45y-m": {
    id: "anon-45y-m",
    name: "ANON | 45Y M",
    age: "45 years",
    gender: "Male",
    status: "qtrack_release_us...",
    currentVisit: "Neurology Consultation",
    previous: "Stroke",
    activeProblems: "Post-Stroke, Hypertension",
    alerts: "Anticoagulation Therapy",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Neurological Recovery",
    orderingDepartment: "Neurology Department",
  },
  "anon-29y-f": {
    id: "anon-29y-f",
    name: "ANON | 29Y F",
    age: "29 years",
    gender: "Female",
    status: "qtrack_release_us...",
    currentVisit: "Orthopedic Surgery",
    previous: "Sports Injury",
    activeProblems: "ACL Tear, Knee Pain",
    alerts: "Post-Operative",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Surgical Recovery",
    orderingDepartment: "Orthopedic Surgery",
  },
  "anon-82y-f": {
    id: "anon-82y-f",
    name: "ANON | 82Y F",
    age: "82 years",
    gender: "Female",
    status: "qtrack_release_us...",
    currentVisit: "Geriatric Assessment",
    previous: "Hip Fracture",
    activeProblems: "Osteoporosis, Dementia, HTN",
    alerts: "Fall Risk, Cognitive Impairment",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Multiple Comorbidities",
    orderingDepartment: "Geriatrics Department",
  },
  "anon-56y-m": {
    id: "anon-56y-m",
    name: "ANON | 56Y M",
    age: "56 years",
    gender: "Male",
    status: "qtrack_release_us...",
    currentVisit: "Gastroenterology",
    previous: "Peptic Ulcer Disease",
    activeProblems: "GERD, IBS, Anxiety",
    alerts: "PPI Therapy",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Chronic GI Conditions",
    orderingDepartment: "Gastroenterology",
  },
  "anon-41y-f": {
    id: "anon-41y-f",
    name: "ANON | 41Y F",
    age: "41 years",
    gender: "Female",
    status: "qtrack_release_us...",
    currentVisit: "Endocrinology",
    previous: "Thyroid Surgery",
    activeProblems: "Hypothyroidism, Diabetes Type 2",
    alerts: "Hormone Replacement",
    imagingSite: "The Mount Sinai Hospital",
    clinicalStatus: "Endocrine Disorders Managed",
    orderingDepartment: "Endocrinology",
  },
};

const allPatients = [
  {
    id: 1,
    patient_id: "sssss",
    name: "shhh",
    dob: "2000-11-12",
    contact: null,
    address: null,
    gender: "male",
    created_at: "2025-06-14T08:58:32.504596Z",
    workspace: 1,
  },
  {
    id: 2,
    patient_id: "sarah-mitchell",
    name: "Sarah Mitchell",
    dob: "1985-03-15",
    contact: "617-555-0123",
    address: "142 Maple Street, Boston, MA 02115",
    gender: "female",
    created_at: "2025-06-14T09:02:58.979327Z",
    workspace: 1,
  },
  {
    id: 3,
    patient_id: "marcus-johnson",
    name: "Marcus Johnson",
    dob: "1978-11-22",
    contact: "312-555-0456",
    address: "789 Oak Avenue, Chicago, IL 60614",
    gender: "male",
    created_at: "2025-06-14T09:02:59.009773Z",
    workspace: 1,
  },
  {
    id: 4,
    patient_id: "emily-chen",
    name: "Emily Chen",
    dob: "1992-07-03",
    contact: "415-555-0789",
    address: "567 Pine Street, San Francisco, CA 94102",
    gender: "female",
    created_at: "2025-06-14T09:02:59.022537Z",
    workspace: 1,
  },
  {
    id: 5,
    patient_id: "robert-thompson",
    name: "Robert Thompson",
    dob: "1965-12-08",
    contact: "713-555-0234",
    address: "234 Cedar Lane, Houston, TX 77001",
    gender: "male",
    created_at: "2025-06-14T09:02:59.035657Z",
    workspace: 1,
  },
  {
    id: 6,
    patient_id: "maria-rodriguez",
    name: "Maria Rodriguez",
    dob: "1988-05-17",
    contact: "305-555-0567",
    address: "890 Elm Drive, Miami, FL 33101",
    gender: "female",
    created_at: "2025-06-14T09:02:59.053269Z",
    workspace: 1,
  },
  {
    id: 7,
    patient_id: "david-wilson",
    name: "David Wilson",
    dob: "1955-09-30",
    contact: "206-555-0890",
    address: "456 Birch Street, Seattle, WA 98101",
    gender: "male",
    created_at: "2025-06-14T09:02:59.064833Z",
    workspace: 1,
  },
  {
    id: 8,
    patient_id: "jennifer-adams",
    name: "Jennifer Adams",
    dob: "1990-04-25",
    contact: "303-555-0123",
    address: "321 Spruce Avenue, Denver, CO 80202",
    gender: "female",
    created_at: "2025-06-14T09:02:59.081135Z",
    workspace: 1,
  },
  {
    id: 9,
    patient_id: "michael-brown",
    name: "Michael Brown",
    dob: "1972-01-19",
    contact: "404-555-0456",
    address: "678 Walnut Court, Atlanta, GA 30301",
    gender: "male",
    created_at: "2025-06-14T09:02:59.093118Z",
    workspace: 1,
  },
  {
    id: 10,
    patient_id: "lisa-parker",
    name: "Lisa Parker",
    dob: "1980-08-12",
    contact: "602-555-0789",
    address: "135 Poplar Street, Phoenix, AZ 85001",
    gender: "female",
    created_at: "2025-06-14T09:02:59.103900Z",
    workspace: 1,
  },
  {
    id: 11,
    patient_id: "kevin-martinez",
    name: "Kevin Martinez",
    dob: "1995-10-07",
    contact: "503-555-0234",
    address: "246 Holly Lane, Portland, OR 97201",
    gender: "male",
    created_at: "2025-06-14T09:02:59.117685Z",
    workspace: 1,
  },
];

export default function PatientPage() {
  const router = useRouter();
  const { patient_uid } = router.query;
  const [activeTab, setActiveTab] = useState("chat");

  const currentPatient = patientsData[patient_uid] || patientsData["anon-116y-m"];

  useEffect(() => {
    console.log("here");
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`https://blue-clowns-fold.loca.lt/api/patients`, {
          headers: {
            "Content-Type": "application/json",
            "bypass-tunnel-reminder": "true",
            // "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await response.json();
        console.log("data-here", data);
      } catch (error) {
        console.log("error-here", error);
      }
    };
    fetchPatientData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/qureLogo.svg" alt="Qure" className="w-20 h-10" />
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-teal-800 p-2 w-28 text-center rounded-lg cursor-pointer">
            Add
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Patients List */}
        <PatientSidebar patients={allPatients} currentPatientId={patient_uid} />

        {/* Center Content */}
        <PatientContent
          patient={currentPatient}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentPatient={currentPatient}
        />

        {/* Right Sidebar - Studies */}
        <StudiesSidebar />
      </div>
    </div>
  );
}
