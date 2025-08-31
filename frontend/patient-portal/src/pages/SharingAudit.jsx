// src/pages/SharingAudit.jsx
import Card from "../components/Card";

export default function SharingAudit() {
  return (
    <Card title="Sharing & Audit">
      <ul className="space-y-6 text-gray-700">
        <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <i className="fa-solid fa-user-doctor text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold text-gray-800">Data Access Log</p>
            <p className="text-sm mt-1">Dr. Smith accessed your data on <strong className="text-gray-900">August 20, 2025</strong>.</p>
          </div>
        </li>
        <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <i className="fa-solid fa-user-doctor text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold text-gray-800">Symptom View Log</p>
            <p className="text-sm mt-1">Dr. Jane viewed your symptoms on <strong className="text-gray-900">August 25, 2025</strong>.</p>
          </div>
        </li>
      </ul>
    </Card>
  );
}