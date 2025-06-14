"use client";

import classNames from "classnames";
import { useState } from "react";
import { BsStars } from "react-icons/bs";

export default function RiskTab({ riskAssessment }) {
  const tags = [
    {
      id: 1,
      name: "Low",
      value: "Low",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Moderate",
      value: "Moderate",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      name: "High",
      value: "High",
      color: "bg-red-500",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Chat Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* ling cancer risk */}
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white mb-8">Lung Cancer Risk</h2>
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className={classNames(
                    `p-1 rounded-full w-28 text-center cursor-pointer`,
                    {
                      [`${tag.color}`]: tag.value === riskAssessment?.risk_level,
                      "border border-gray-600": tag.value !== riskAssessment?.risk_level,
                    }
                  )}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg flex items-center gap-2">
              <BsStars className="text-yellow-500" />
              AI Key Findings
            </p>
            <div className="flex flex-col space-y-4">
              <ul className="text-base list-disc list-inside text-gray-200">
                {riskAssessment?.drivers?.map((driver) => (
                  <li key={driver.id}>{driver}</li>
                ))}
              </ul>
              <ul className="text-base list-disc list-inside text-gray-200">
                {riskAssessment?.lack_of_risk_evidence?.map((evidence) => (
                  <li key={evidence.id}>{evidence}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
