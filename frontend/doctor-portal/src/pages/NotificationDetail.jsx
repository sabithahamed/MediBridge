import { useParams, Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { notifications, patients } from "../data/mockData";

// Helper to get detailed info and styling for icons
const getNotificationDetails = (type) => {
    switch (type) {
      case 'symptom': return { icon: 'fa-lungs-virus', color: 'orange', title: 'Symptom Alert' };
      case 'emergency': return { icon: 'fa-triangle-exclamation', color: 'red', title: 'Emergency Access Event' };
      case 'lab': return { icon: 'fa-flask-vial', color: 'blue', title: 'Lab Result Notification' };
      case 'medication': return { icon: 'fa-pills', color: 'purple', title: 'Medication Adherence Alert' };
      case 'appointment': return { icon: 'fa-calendar-check', color: 'green', title: 'Appointment Reminder' };
      default: return { icon: 'fa-bell', color: 'gray', title: 'General Notification' };
    }
};

export default function NotificationDetail() {
  const { notificationId } = useParams();
  const navigate = useNavigate();

  const cleanId = parseInt(notificationId.split('-')[0], 10);
  const notification = notifications.find((n) => n.id === cleanId);
  const patient = patients.find(p => notification?.message.includes(p.name));
  
  if (!notification) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Notification Not Found</h1>
        <Link to="/doctor/notifications" className="text-blue-600 mt-4 inline-block">Return to Notifications</Link>
      </div>
    );
  }

  const { icon, color, title } = getNotificationDetails(notification.type);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-4">
          <i className="fa-solid fa-arrow-left mr-2"></i>Back to previous page
        </button>
        <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-${color}-100`}>
                <i className={`fa-solid ${icon} text-3xl text-${color}-600`}></i>
            </div>
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500 text-sm">ID: {notificationId}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Event Summary">
            <p className="text-lg text-gray-800">{notification.message}</p>
            <p className="text-sm text-gray-500 mt-2"><strong>Timestamp:</strong> {notification.date} at 08:45 AM</p>
          </Card>

          <Card title="Suggested Actions">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {notification.type === 'symptom' && <li>Review patient's latest symptom logs and vitals.</li>}
                {notification.type === 'emergency' && <li>Verify the justification for the emergency access event.</li>}
                {notification.type === 'lab' && <li>Open patient's chart to view new lab results.</li>}
                <li>Ensure all actions are logged in the patient's record.</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          {patient && (
            <Card title="Associated Patient">
                <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                        <i className="fa-solid fa-user text-xl text-blue-500"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-500">ID: {patient.id}</p>
                    </div>
                </div>
                 <button 
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                      className='mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                    >
                      View Patient Summary
                  </button>
            </Card>
          )}

          <Card title="Audit Trail">
            <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                    <i className="fa-solid fa-circle-check text-green-500 mt-1 mr-2"></i>
                    <div>
                        <p className="font-semibold text-gray-700">Alert Viewed</p>
                        <p className="text-gray-500">by You on 2025-08-30 at 09:00 AM</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <i className="fa-solid fa-paper-plane text-blue-500 mt-1 mr-2"></i>
                    <div>
                        <p className="font-semibold text-gray-700">Notification Delivered</p>
                        <p className="text-gray-500">to Doctor Portal on {notification.date}</p>
                    </div>
                </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}