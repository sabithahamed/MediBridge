// src/pages/SharingAudit.jsx
import Card from "../components/Card";

export default function SharingAudit() {
  // Example audit log data
  const auditEvents = [
    {
      id: 1,
      doctor: "Dr. Smith",
      action: "Accessed your medical data",
      date: "2025-08-20 09:15",
      type: "data",
    },
    {
      id: 2,
      doctor: "Dr. Jane",
      action: "Viewed your symptoms",
      date: "2025-08-25 14:30",
      type: "symptom",
    },
    {
      id: 3,
      doctor: "Dr. Lee",
      action: "Downloaded your prescription",
      date: "2025-08-28 11:05",
      type: "prescription",
    },
    {
      id: 4,
      doctor: "Dr. Smith",
      action: "Viewed your lab report",
      date: "2025-08-29 16:20",
      type: "lab",
    },
  ];

  const iconMap = {
    data: "fa-database",
    symptom: "fa-notes-medical",
    prescription: "fa-file-prescription",
    lab: "fa-vials",
  };

  return (
    <Card title="Sharing & Audit">
      <ul className="space-y-6 text-gray-700">
        {auditEvents.map((event) => (
          <li key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <i className={`fa-solid ${iconMap[event.type] || "fa-user-doctor"} text-blue-500 text-2xl`}></i>
            <div>
              <p className="font-semibold text-gray-800">{event.action}</p>
              <p className="text-sm mt-1">
                <span className="text-blue-700 font-bold">{event.doctor}</span> on <span className="text-gray-900 font-semibold">{event.date}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}