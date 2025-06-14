export default function PatientSummaryTab({ summary }) {
  const demographics = {
    age: "116 years",
    gender: "Male",
    mrn: "P0D0B8983C7D6517",
    location: "The Mount Sinai Hospital",
  };

  const medications = [
    "Albuterol Inhaler - 2 puffs q4-6h PRN",
    "Fluticasone Inhaler - 2 puffs BID",
  ];

  const diagnoses = ["Pneumonia (Primary)", "Asthma", "COPD"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Patient Summary</h2>

      <div className="space-y-8">
        <p className="text-gray-300 text-lg">{summary}</p>
        {/* Demographics */}
        {/* <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Demographics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-gray-400 text-sm mb-1">Age:</div>
              <div className="text-white text-lg">{demographics.age}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Gender:</div>
              <div className="text-white text-lg">{demographics.gender}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">MRN:</div>
              <div className="text-white text-lg">{demographics.mrn}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Location:</div>
              <div className="text-white text-lg">{demographics.location}</div>
            </div>
          </div>
        </div> */}

        {/* Active Medications */}
        {/* <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Active Medications</h3>
          <ul className="space-y-3">
            {medications.map((medication, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="mr-2 text-blue-400">•</span>
                {medication}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Current Diagnoses */}
        {/* <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Current Diagnoses</h3>
          <ul className="space-y-3">
            {diagnoses.map((diagnosis, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="mr-2 text-red-400">•</span>
                {diagnosis}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
