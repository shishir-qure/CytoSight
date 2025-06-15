import Link from "next/link";
import { format, differenceInYears, parseISO } from "date-fns";
import { useState } from "react";
import classNames from "classnames";

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

  const handleFilter = async (filter) => {
    setFilter(filter);
    let payload = {};

    if (filter === "tumor_board") {
      payload = {
        added_to_tumor_board: true,
      };
    } else if (filter === "visits_today") {
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      payload = {
        start_date: startOfToday,
        end_date: endOfToday,
      };
    } else if (filter === "all_patients") {
      payload = {};
    } else {
      payload = {
        risk: filter,
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients/`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPatientData(data?.data);
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Stats */}
      <div className="p-2 border-b border-gray-700">
        <p className="text-md text-gray-200 py-2 font-medium">Quick filters</p>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.map((option) => (
            <div
              key={option.id}
              className={classNames(
                "text-center border p-2 rounded-lg border-gray-700 hover:bg-teal-700 cursor-pointer transition-all duration-300",
                {
                  "!bg-teal-700": filter === option.id,
                  "bg-teal-700":
                    option.id === "risk_lc" &&
                    (filter === "Low" ||
                      filter === "Moderate" ||
                      filter === "High" ||
                      filter === "Confirmed"),
                }
              )}
            >
              {option.id !== "risk_lc" ? (
                <div
                  onClick={() => handleFilter(option.id)}
                  className="text-sm text-gray-200"
                >
                  {option.label}
                </div>
              ) : (
                <select
                  onChange={(e) => handleFilter(e.target.value)}
                  className="text-sm text-gray-200 outline-0 border-0"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-400">{patients?.length} Patients</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
      </div>

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto">
        {patients?.map((patient, index) => (
          <Link key={index} href={`/patients/${patient.id}`}>
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
