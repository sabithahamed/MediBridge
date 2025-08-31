import { useState } from "react";
import Card from "../components/Card";
import { patients, notifications } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/NotificationModal"; // <-- IMPORT THE NEW COMPONENT

// Helper component for individual stat cards to make it interactive
const StatCard = ({ icon, color, title, value, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer group ${!onClick && 'cursor-default'}`}>
    <Card className="transform group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
      <div className="flex items-center p-4">
        <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-${color}-100 transition-colors group-hover:bg-${color}-200`}>
          <i className={`fa-solid ${icon} text-3xl text-${color}-500`}></i>
        </div>
        <div className="ml-4 text-left">
          <p className="text-lg font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </Card>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const recentPatients = patients.slice(0, 3);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };
  
  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Modal will render here when a notification is selected */}
      <NotificationModal notification={selectedNotification} onClose={handleCloseModal} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-lg mt-1">Welcome back, Doctor. Here's your overview.</p>
      </div>

      {/* Interactive Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="fa-user-injured" color="blue" title="Total Patients" value={patients.length} onClick={() => navigate('/doctor/patients')} />
        <StatCard icon="fa-bell" color="yellow" title="Unread Alerts" value={unreadNotifications} onClick={() => navigate('/doctor/notifications')} />
        <StatCard icon="fa-clock" color="green" title="Appointments" value="5" onClick={() => alert('Navigating to the full Appointments page...')} />
        <StatCard icon="fa-triangle-exclamation" color="red" title="Health Alerts" value="1" onClick={() => alert('Viewing critical public health alerts...')} />
      </div>

      {/* Main Content Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients Section */}
        <div className="lg:col-span-2">
          <Card title="Recent Patient Activity">
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                    <i className="fa-solid fa-user text-xl text-blue-500"></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-500">
                      New symptom reported: {patient.latestSymptom?.description || "N/A"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                    className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Interactive Notifications Section */}
        <div>
          <Card title="Notifications">
            <div className="space-y-3">
              {notifications.slice(0, 4).map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-l-8 ${notif.read ? 'bg-white border-gray-300 hover:border-gray-400' : 'bg-blue-50 border-blue-400 hover:border-blue-500'}`}
                >
                  <p className={`font-medium ${notif.read ? 'text-gray-700' : 'text-blue-800'}`}>{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}