"use client";

import classNames from "classnames";
import { useState } from "react";
import { BsStars } from "react-icons/bs";

export default function RiskTab() {
  const [riskLevel, setRiskLevel] = useState("low");

  const tags = [
    {
      id: 1,
      name: "Low",
      value: "low",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Medium",
      value: "medium",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      name: "High",
      value: "high",
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "Confirmed",
      value: "confirmed",
      color: "bg-blue-500",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Chat Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* ling cancer risk */}
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <p className="font-semibold text-lg">Lung Cancer Risk</p>
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className={classNames(
                    `p-1 rounded-full w-28 text-center cursor-pointer`,
                    {
                      [`${tag.color}`]: tag.value === riskLevel,
                      "border border-gray-600": tag.value !== riskLevel,
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
            <p className="text-base text-gray-200">
              The patient has a high risk of developing lung cancer. The patient has a
              high risk of developing lung cancer. The patient has a high risk of
              developing lung cancer. The patient has a high risk of developing lung
              cancer. The patient has a high risk of developing lung cancer.
              <br />
              <br />
              The patient has a high risk of developing lung cancer. The patient has a
              high risk of developing lung cancer. The patient has a high risk of
              developing lung cancer. The patient has a high risk of developing lung
              cancer. The patient has a high risk of developing lung cancer.
              <br />
              <br />
              The patient has a high risk of developing lung cancer. The patient has a
              high risk of developing lung cancer. The patient has a high risk of
              developing lung cancer. The patient has a high risk of developing lung
              cancer. The patient has a high risk of developing lung cancer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
