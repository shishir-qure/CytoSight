import Link from "next/link";
import { format, differenceInYears, parseISO } from "date-fns";
import { useRouter } from "next/router";

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

export default function PatientSidebar({ patients, currentPatientId }) {
  const router = useRouter();

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Search */}
      {router.pathname.includes("patients") && (
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
      )}

      {/* Stats */}
      {router.pathname.includes("patients") && (
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
      )}

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto">
        {patients.map((patient) => (
          <Link
            key={patient.id}
            href={
              router.pathname.includes("patients")
                ? `/patients/${patient.id}`
                : `/tumor-board?patient_uid=${patient.id}`
            }
          >
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
