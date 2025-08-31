import Card from "../components/Card";

export default function EmergencyAccessNotification() {
  // Example notifications, replace with API integration
  const notifications = [
    { id: 1, doctor: "Dr. Smith", reason: "Emergency access requested", date: "2025-09-01" },
  ];

  return (
    <Card title="Emergency Access Notifications">
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-gray-400">No emergency notifications.</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-sm border border-red-200 bg-red-50">
              <div>
                <span className="font-semibold text-red-700">{n.doctor}</span>
                <span className="ml-2 text-xs text-gray-500">{n.reason}</span>
                <span className="ml-2 text-xs text-gray-400">{n.date}</span>
              </div>
              <span className="px-4 py-1 rounded bg-red-500 text-white text-xs cursor-pointer">Emergency</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
