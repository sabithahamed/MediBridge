import Card from "../components/Card";

export default function Prescriptions() {
  // Example data, replace with API integration
  const prescriptions = [
    { id: 1, patient: "John Doe", name: "Amoxicillin", date: "2025-08-30" },
    { id: 2, patient: "Jane Smith", name: "Ibuprofen", date: "2025-08-28" },
  ];

  return (
    <Card title="Prescriptions">
      <div className="space-y-4">
        {prescriptions.map((p) => (
          <div key={p.id} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-sm border border-gray-200">
            <div>
              <span className="font-semibold text-gray-800">{p.name}</span>
              <span className="ml-2 text-xs text-gray-500">{p.date}</span>
              <span className="ml-2 text-xs text-blue-500">{p.patient}</span>
            </div>
            <button className="mt-2 md:mt-0 px-4 py-1 rounded bg-blue-500 text-white text-xs">View</button>
          </div>
        ))}
      </div>
    </Card>
  );
}
