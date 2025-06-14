
import React from "react";
import { usePatientReports } from "../components/ReportSidebar/services/usePatientReports";

import ReportItem from "./ReportSidebar/ReportItem";


export default function StudiesSidebar({ patient_uid }) {


  const { reports:study, loading, error } = usePatientReports({ patient_uid });




  return (
    <div className="w-96 bg-gray-900 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Patient Studies</h2>
        <p className="text-sm text-gray-400">Auto-retrieved via PACS connection</p>
      </div>



      <div className="p-4 space-y-6">

        <div key={study.id} className="bg-gray-700 rounded-lg p-4">

          <div className="flex items-start justify-between mb-3">
            {study?.scan_type && <div className="flex items-start space-x-3 justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                {study?.scan_type?.includes("CT") && <span className="text-white text-sm">📊</span>}
                {study?.scan_type?.includes("X-ray") && <span className="text-white text-sm">📷</span>}
                {study?.scan_type?.includes("Echo") && <span className="text-white text-sm">❤️</span>}
              </div>
              <div>
                <div className="font-semibold text-white uppercase text-2xl">{study.scan_type} </div>


              </div>
            </div>
}
          </div>

          {study?.summary && <div className="bg-red-900 rounded-lg p-3 mb-4">
            <div className="text-red-300 font-semibold text-sm mb-2">🤖 AI Key Findings:</div>
            <ul className="text-xs text-red-200 space-y-1">
              {study?.summary}
            </ul>
          </div>}


          {study?.keyslices_dict && <div className="mb-4">
            <div className="text-sm font-semibold mb-2 text-gray-300">🎬 Key Slice Videos (AI Generated):</div>
            <div className="">

              <ReportItem
                key={study.id}
                report={study}
                keySlices={study?.keyslices_dict}
              // executeTask={executeTask}
              />

            </div>
          </div>}


        </div>

      </div>
    </div>
  );
}
