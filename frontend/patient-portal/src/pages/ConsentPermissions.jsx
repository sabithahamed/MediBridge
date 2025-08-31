import { useState } from "react";
import Card from "../components/Card";

export default function ConsentPermissions() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      doctor: "Dr. Alex Johnson",
      reason: "Reviewing recent lab results",
      status: "pending",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Lee",
      reason: "Follow-up on your prescription",
      status: "pending",
    },
    {
      id: 3,
      doctor: "Dr. Ben Carter",
      reason: "General health review",
      status: "accepted",
    },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Card title="Consent Permissions">
        <p className="text-gray-600 mb-6">
          Review and manage data access requests from your healthcare providers.
        </p>
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 rounded-xl shadow-sm border border-gray-200 bg-white"
            >
              <div>
                <p className="font-semibold text-gray-800">{req.doctor}</p>
                <p className="text-sm text-gray-500">{req.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                {req.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAction(req.id, "accepted")}
                      className="px-4 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "denied")}
                      className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Deny
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      req.status === "accepted"
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}