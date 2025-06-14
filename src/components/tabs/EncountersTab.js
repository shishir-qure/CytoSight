export default function EncountersTab({ encounters }) {
  // const encounters = [
  //   {
  //     title: "Pulmonary Clinic Visit",
  //     date: "Jun 10, 2025 09:00 AM - 09:45 AM",
  //     reason: "Dyspnea (Shortness of breath)",
  //     provider: "Dr. Sarah Smith",
  //     department: "Pulmonology",
  //     status: "Completed",
  //     notes:
  //       "Patient reports improvement in breathing with current medications. PFT scheduled for next week.",
  //   },
  //   {
  //     title: "Emergency Department",
  //     date: "Jun 8, 2025 14:30 PM - 18:15 PM",
  //     reason: "Chest pain",
  //     provider: "Dr. Michael Johnson",
  //     department: "Emergency Medicine",
  //     status: "Completed",
  //     notes:
  //       "Chest pain workup negative. EKG normal, troponins negative. Discharged with cardiology follow-up.",
  //   },
  //   {
  //     title: "Cardiology Consultation",
  //     date: "Jun 5, 2025 10:00 AM - 10:30 AM",
  //     reason: "Hypertension management",
  //     provider: "Dr. Emily Chen",
  //     department: "Cardiology",
  //     status: "Completed",
  //     notes: "Blood pressure well controlled on current regimen. Continue ACE inhibitor.",
  //   },
  //   {
  //     title: "Primary Care Visit",
  //     date: "May 28, 2025 14:00 PM - 14:30 PM",
  //     reason: "Annual physical examination",
  //     provider: "Dr. Robert Wilson",
  //     department: "Internal Medicine",
  //     status: "Completed",
  //     notes:
  //       "Overall health stable. Recommended lifestyle modifications and specialist referrals.",
  //   },
  //   {
  //     title: "Radiology - CT Chest",
  //     date: "May 25, 2025 11:00 AM - 11:30 AM",
  //     reason: "Follow-up lung nodule",
  //     provider: "Dr. Lisa Park",
  //     department: "Radiology",
  //     status: "Completed",
  //     notes: "Stable lung nodule, no significant changes from prior study.",
  //   },
  //   {
  //     title: "Laboratory Services",
  //     date: "May 20, 2025 08:00 AM - 08:15 AM",
  //     reason: "Routine blood work",
  //     provider: "Lab Technician",
  //     department: "Laboratory",
  //     status: "Completed",
  //     notes: "Complete metabolic panel, CBC with differential, lipid panel completed.",
  //   },
  //   {
  //     title: "Pharmacy Consultation",
  //     date: "May 15, 2025 16:00 PM - 16:20 PM",
  //     reason: "Medication review",
  //     provider: "PharmD Jennifer Lee",
  //     department: "Pharmacy",
  //     status: "Completed",
  //     notes:
  //       "Reviewed all medications for interactions. Patient counseled on proper inhaler technique.",
  //   },
  //   {
  //     title: "Physical Therapy",
  //     date: "May 10, 2025 13:00 PM - 14:00 PM",
  //     reason: "Pulmonary rehabilitation",
  //     provider: "PT Mark Thompson",
  //     department: "Physical Therapy",
  //     status: "Completed",
  //     notes:
  //       "Patient completed 6-week pulmonary rehab program. Significant improvement in exercise tolerance.",
  //   },
  // ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Recent Encounters</h2>

        <div className="space-y-6">
          {encounters?.map((encounter, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {encounter?.title}
                  </h3>
                  <div className="text-gray-400 text-sm mb-2">{encounter?.date}</div>
                  <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">
                    {encounter?.department}
                  </span>
                </div>
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                  {encounter?.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-gray-300 font-medium">Reason: </span>
                  <span className="text-gray-400">{encounter?.reason}</span>
                </div>
                <div>
                  <span className="text-gray-300 font-medium">Provider: </span>
                  <span className="text-gray-400">{encounter?.provider}</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded p-3">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Clinical Notes:
                </h4>
                <p className="text-gray-400 text-sm">{encounter?.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
