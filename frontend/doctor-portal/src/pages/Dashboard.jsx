import Card from "../components/Card";
import { patients, notifications } from "../data/mockData";

export default function Dashboard() {
  const recentPatients = patients.slice(0, 3);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    // REMOVED the Layout wrapper since it's already provided by App.jsx
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Doctor. Here's today's overview.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <div className="p-4">
            <i className="fa-solid fa-user-injured text-4xl text-blue-500 mb-3"></i>
            <h3 className="text-2xl font-bold text-gray-800">{patients.length}</h3>
            <p className="text-gray-600">Total Patients</p>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="p-4">
            <i className="fa-solid fa-bell text-4xl text-yellow-500 mb-3"></i>
            <h3 className="text-2xl font-bold text-gray-800">{unreadNotifications}</h3>
            <p className="text-gray-600">Unread Notifications</p>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="p-4">
            <i className="fa-solid fa-clock text-4xl text-green-500 mb-3"></i>
            <h3 className="text-2xl font-bold text-gray-800">5</h3>
            <p className="text-gray-600">Today's Appointments</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Patients">
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">{patient.name}</h3>
                <p className="text-sm text-gray-600">Age: {patient.age} | {patient.gender}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Latest Symptom: {patient.latestSymptom?.description || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Notifications">
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{notif.message}</p>
                <p className="text-sm text-gray-600">{notif.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}