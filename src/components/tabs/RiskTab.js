"use client";

import classNames from "classnames";
import { useState } from "react";
import { BsExclamationTriangle, BsStars } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

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
    {
      id: 4,
      name: "Confirmed",
      value: "Confirmed",
      color: "bg-red-700",
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
                  className={classNames(`p-1 rounded-full w-28 text-center`, {
                    [`${tag.color}`]: tag.value === riskAssessment?.risk_level,
                    "border border-gray-600": tag.value !== riskAssessment?.risk_level,
                  })}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-xl flex items-center gap-2">
              <BsStars className="text-yellow-500" />
              AI Risk Analysis
            </p>
            <div className="flex flex-col space-y-6 ml-5">
              {riskAssessment?.drivers?.length > 0 && (
                <ul className="text-base list-disc list-inside text-gray-100">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-200">
                    <BsExclamationTriangle className="text-red-500" /> Risk Drivers
                  </div>
                  {riskAssessment?.drivers?.map((driver) => (
                    <li key={driver.id}>{driver}</li>
                  ))}
                </ul>
              )}
              {riskAssessment?.lack_of_risk_evidence?.length > 0 && (
                <ul className="text-base list-disc list-inside text-gray-100">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-200">
                    <FaShieldAlt className="text-green-400" /> Protective Factors
                  </div>
                  {riskAssessment?.lack_of_risk_evidence?.map((evidence) => (
                    <li key={evidence.id}>{evidence}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
