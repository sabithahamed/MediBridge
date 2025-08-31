import Card from "../components/Card";

export default function LabReports() {
  // In a real application, this data would come from an API
  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      date: "2025-08-20",
      status: "New",
      resultLink: "#",
    },
    {
      id: 2,
      testName: "Cholesterol Panel",
      date: "2025-07-15",
      status: "Viewed",
      resultLink: "#",
    },
    {
      id: 3,
      testName: "Thyroid Function Test",
      date: "2025-06-22",
      status: "Viewed",
      resultLink: "#",
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Card title="My Lab Reports">
        <div className="space-y-4">
          {labReports.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No lab reports found.</div>
          ) : (
            labReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl shadow-sm border border-purple-200 bg-purple-50"
              >
                <div>
                  <p className="font-bold text-gray-800">{report.testName}</p>
                  <p className="text-sm text-gray-600 mt-1">Date: {report.date}</p>
                </div>
                <a
                  href={report.resultLink}
                  className={`px-4 py-1 rounded-full text-xs text-white mt-2 md:mt-0 ${
                    report.status === "New" ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
                  }`}
                >
                  {report.status === "New" ? "View Report" : "Viewed"}
                </a>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}