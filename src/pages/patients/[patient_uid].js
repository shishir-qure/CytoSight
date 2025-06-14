"use client"

import { useRouter } from "next/router"
import { useState } from "react"
import PatientSidebar from "../../components/PatientSidebar"
import PatientContent from "../../components/PatientContent"
import StudiesSidebar from "../../components/StudiesSidebar"

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
}

const allPatients = [
  {
    id: "anon-116y-m",
    name: "anon",
    age: "116Y M",
    code: "P0D0B89B3C7D6517",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:39 AM",
    hasAlert: true,
  },
  {
    id: "anon-52y-m",
    name: "anon",
    age: "52Y M",
    code: "pAD6F3E11222C17",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:35 AM",
  },
  {
    id: "anon-67y-f",
    name: "anon",
    age: "67Y F",
    code: "CAR789123456789",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:30 AM",
    hasAlert: true,
  },
  {
    id: "anon-34y-f",
    name: "anon",
    age: "34Y F",
    code: "EMR456789012345",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:25 AM",
    hasAlert: true,
  },
  {
    id: "anon-78y-m",
    name: "anon",
    age: "78Y M",
    code: "ONC987654321098",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:20 AM",
    hasAlert: true,
  },
  {
    id: "anon-45y-m",
    name: "anon",
    age: "45Y M",
    code: "NEU123987456321",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:15 AM",
  },
  {
    id: "anon-29y-f",
    name: "anon",
    age: "29Y F",
    code: "ORT654321987654",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:10 AM",
  },
  {
    id: "anon-82y-f",
    name: "anon",
    age: "82Y F",
    code: "GER321654987321",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:05 AM",
    hasAlert: true,
  },
  {
    id: "anon-56y-m",
    name: "anon",
    age: "56Y M",
    code: "GAS789456123789",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 07:00 AM",
  },
  {
    id: "anon-41y-f",
    name: "anon",
    age: "41Y F",
    code: "END147258369147",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:55 AM",
  },
  {
    id: "anon-63y-m",
    name: "anon",
    age: "63Y M",
    code: "URO258369147258",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:50 AM",
  },
  {
    id: "anon-38y-f",
    name: "anon",
    age: "38Y F",
    code: "DER369147258369",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:45 AM",
  },
  {
    id: "anon-71y-m",
    name: "anon",
    age: "71Y M",
    code: "PSY147369258147",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:40 AM",
    hasAlert: true,
  },
  {
    id: "anon-26y-f",
    name: "anon",
    age: "26Y F",
    code: "OBS258147369258",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:35 AM",
  },
  {
    id: "anon-59y-m",
    name: "anon",
    age: "59Y M",
    code: "RAD369258147369",
    workspace: "qtrack_release_user_1.s Workspace",
    date: "Jun 13, 2025 06:30 AM",
  },
]

export default function PatientPage() {
  const router = useRouter()
  const { patient_uid } = router.query
  const [activeTab, setActiveTab] = useState("chat")

  const currentPatient = patientsData[patient_uid] || patientsData["anon-116y-m"]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      {/* <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">Worklist</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">⚙️</span>
            <span className="text-gray-400">🔔</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">{currentPatient.name}</span>
          <span className="text-gray-400">{currentPatient.status}</span>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
            👤 Add to Tumor Board
          </button>
          <span className="text-gray-400">Studies 2</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">⚙️</span>
            <span className="text-gray-400">🔔</span>
          </div>
          <span className="text-lg font-semibold">Patient Studies</span>
        </div>
      </div> */}

      <div className="flex h-[calc(100vh)]">
        {/* Left Sidebar - Patients List */}
        <PatientSidebar patients={allPatients} currentPatientId={patient_uid} />

        {/* Center Content */}
        <PatientContent patient={currentPatient} activeTab={activeTab} setActiveTab={setActiveTab} currentPatient={currentPatient}/>

        {/* Right Sidebar - Studies */}
        <StudiesSidebar />
      </div>
    </div>
  )
}
