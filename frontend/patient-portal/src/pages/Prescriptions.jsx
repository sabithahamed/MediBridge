import Card from "../components/Card";

export default function Prescriptions() {
  // In a real application, this data would come from an API
  const prescriptions = [
    {
      id: 1,
      medication: "Amoxicillin",
      dosage: "250mg, twice a day",
      doctor: "Dr. Eleanor Vance",
      date: "2025-08-25",
    },
    {
      id: 2,
      medication: "Ibuprofen",
      dosage: "200mg, as needed",
      doctor: "Dr. Marcus Thorne",
      date: "2025-08-10",
    },
    {
      id: 3,
      medication: "Lisinopril",
      dosage: "10mg, once daily",
      doctor: "Dr. Eleanor Vance",
      date: "2025-07-30",
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Card title="My Prescriptions">
        <div className="space-y-4">
          {prescriptions.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No prescriptions found.</div>
          ) : (
            prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl shadow-sm border border-blue-200 bg-blue-50"
              >
                <div>
                  <p className="font-bold text-gray-800">{prescription.medication}</p>
                  <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                  <p className="text-xs text-gray-500 mt-1">Prescribed by: {prescription.doctor}</p>
                </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0 text-xs text-gray-400">
              <i className="fa-solid fa-calendar-alt"></i>
              <span>{prescription.date}</span>
              <button className="ml-4 px-4 py-1 rounded bg-blue-500 text-white text-xs cursor-pointer">Download</button>
            </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}