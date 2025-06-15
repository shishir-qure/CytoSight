import React, { useState } from "react";

import PngStackViewer from "./PngStackViewer";

const ReportItem = ({ report, keySlices }) => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSliceClick = (slice) => {
    setSelectedSlice(slice);
  };

  const handleCloseModal = () => {
    setSelectedSlice(null);
  };

  return (
    <div className="w-full dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        {keySlices?.length > 0 && (
          <div className="mt-4">
            {/* <h4 className="text-md font-semibold mb-2">Findings</h4> */}
            <div className="grid grid-cols-2 gap-4">
              {keySlices?.map((slice) => (
                <div
                  key={slice?.label}
                  className="bg-gray-50 dark:bg-gray-600 p-3 rounded"
                >
                  <div
                    className="font-medium text-gray-700 dark:text-gray-200  cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => handleSliceClick(slice)}
                  >
                    {slice?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedSlice && (
        <div className="fixed inset-0  bg-black bg-opacity-50 pt-4 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg py-6 px-12 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {selectedSlice.label}
                </h2>
                <h4 className=" font-semibold text-gray-400 pt-2 ">
                  {selectedSlice.key_finding_description}
                </h4>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex">
                <div>
                  <p className="text-sm text-gray-500 mr-4 dark:text-gray-300 font-bold">
                    Start Slice:
                  </p>
                  <p className="font-medium text-white ">{selectedSlice.start_slice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300 font-bold">
                    End Slice:
                  </p>
                  <p className="font-medium">{selectedSlice.end_slice}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-bold border-b border-gray-500 pb-4 mb-6 text-gray-900  dark:text-white">
                  Scans
                </h4>
                <div className="">
                  <div
                    key={selectedSlice}
                    className="relative w-full flex justify-center items-center text-xl"
                  >
                    <PngStackViewer
                      images={selectedSlice.file_links}
                      firstSlice={selectedSlice.start_slice}
                      lastSlice={selectedSlice.end_slice}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportItem;
