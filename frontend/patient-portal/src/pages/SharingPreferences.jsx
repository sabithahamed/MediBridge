import { useState } from "react";
import Card from "../components/Card";

export default function SharingPreferences() {
  const [preferences, setPreferences] = useState({
    medication: true,
    labReports: true,
    symptoms: false,
    allergies: true,
    immunizations: false,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const preferenceItems = [
    { key: "medication", label: "Medication History" },
    { key: "labReports", label: "Lab Reports" },
    { key: "symptoms", label: "Symptom Log" },
    { key: "allergies", label: "Allergies" },
    { key: "immunizations", label: "Immunizations" },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Card title="Data Sharing Preferences">
        <p className="text-gray-600 mb-6">
          Choose which types of data are shareable with new or approved
          providers.
        </p>
        <div className="space-y-4">
          {preferenceItems.map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center p-4 rounded-xl shadow-sm border border-gray-200 bg-white"
            >
              <span className="text-lg font-medium text-gray-800">
                {item.label}
              </span>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences[item.key] ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences[item.key]
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Note: Emergency access requests will always override these
          preferences.
        </p>
      </Card>
    </div>
  );
}