import Link from "next/link";
import { format, differenceInYears, parseISO } from "date-fns";
import { useState } from "react";

// Helper function to calculate age
const calculateAge = (dob) => {
  try {
    const birthDate = parseISO(dob);
    const today = new Date();
    return differenceInYears(today, birthDate);
  } catch (error) {
    console.error("Error calculating age:", error);
    return "N/A";
  }
};

const filterOptions = [
  { id: "all_patients", label: "All Patients" },
  { id: "visits_today", label: "Visits Today" },
  { id: "risk_lc", label: "Risk LC" },
  { id: "tumor_board", label: "Tumor Board" },
];

export default function PatientSidebar({ patients, currentPatientId, setPatientData }) {
  const [filter, setFilter] = useState("all_patients");
  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Search */}
      {/* {router.pathname.includes("patients") && (
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or filter patients"
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      )} */}

      {/* Stats */}
      <div className="p-2 border-b border-gray-700">
        <p className="text-md text-gray-200 py-2 font-medium">Quick filters</p>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.map((option) => (
            <div
              key={option.id}
              className="text-center border p-2 rounded-lg border-gray-700 hover:bg-teal-700 cursor-pointer transition-all duration-300"
            >
              <div className="text-sm text-gray-200">{option.label}</div>
            </div>
          ))}
          {/* <div className="text-center border p-2 rounded-lg border-gray-700 hover:bg-teal-700 cursor-pointer transition-all duration-300">
            <div className="text-sm text-gray-200">Visits Today</div>
          </div>
          <div className="text-center border p-2 rounded-lg border-gray-700 hover:bg-teal-700 cursor-pointer transition-all duration-300">
            <div className="text-sm text-gray-200">Risk LC</div>
          </div>
          <div className="text-center border p-2 rounded-lg border-gray-700 hover:bg-teal-700 cursor-pointer transition-all duration-300">
            <div className="text-sm text-gray-200">Tumor Board</div>
          </div> */}
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-400">{patients?.length} Patients</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
      </div>

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto">
        {patients?.map((patient) => (
          <Link key={patient.id} href={`/patients/${patient.id}`}>
            <div
              className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer relative ${
                currentPatientId == patient.id ? "bg-gray-700" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold">{patient.name}</div>
                    <div className="text-sm text-gray-400">
                      {calculateAge(patient.dob)}Y | {patient.gender}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(patient.created_at), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
