import Card from "../components/Card";

export default function LabReports() {
  // Example data, replace with API integration
  const reports = [
    { id: 1, patient: "John Doe", name: "Blood Test", date: "2025-08-29" },
    { id: 2, patient: "Jane Smith", name: "X-Ray", date: "2025-08-27" },
  ];

  return (
    <Card title="Lab Reports">
      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-sm border border-gray-200">
            <div>
              <span className="font-semibold text-gray-800">{r.name}</span>
              <span className="ml-2 text-xs text-gray-500">{r.date}</span>
              <span className="ml-2 text-xs text-blue-500">{r.patient}</span>
            </div>
            <button className="mt-2 md:mt-0 px-4 py-1 rounded bg-blue-500 text-white text-xs">View</button>
          </div>
        ))}
      </div>
    </Card>
  );
}
