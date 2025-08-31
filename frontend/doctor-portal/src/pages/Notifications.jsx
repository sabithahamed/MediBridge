
import { useState } from "react";
import { notifications as mockNotifications } from "../data/mockData";
import NotificationModal from "../components/NotificationModal";
import SuccessDialog from "../components/SuccessDialog";

const getNotificationIcon = (type) => {
  switch (type) {
    case 'symptom': return { icon: 'fa-lungs-virus', color: 'orange' };
    case 'emergency': return { icon: 'fa-triangle-exclamation', color: 'red' };
    case 'lab': return { icon: 'fa-flask-vial', color: 'blue' };
    case 'medication': return { icon: 'fa-pills', color: 'purple' };
    case 'appointment': return { icon: 'fa-calendar-check', color: 'green' };
    default: return { icon: 'fa-bell', color: 'gray' };
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setSuccessMessage("All notifications marked as read!");
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  return (
    <div className="animate-fade-in">
      {selectedNotification && <NotificationModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />}
      {successMessage && <SuccessDialog message={successMessage} onClose={() => setSuccessMessage("")} />}
      
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600 mt-1">Review and manage all your recent alerts and messages.</p>
      </div>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center">
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-semibold ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
          <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-lg font-semibold ${filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Unread</button>
          <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-lg font-semibold ${filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Read</button>
        </div>
        <button onClick={handleMarkAllRead} className="text-blue-600 hover:underline font-semibold">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const { icon, color } = getNotificationIcon(notif.type);
            return (
              <div 
                key={notif.id} 
                onClick={() => handleNotificationClick(notif)}
                className={`flex items-start p-4 bg-white rounded-xl shadow-sm border-l-4 cursor-pointer hover:shadow-lg hover:border-l-8 transition-all duration-300 ${notif.read ? 'border-gray-300' : `border-${color}-500`}`}
              >
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-${color}-100 mr-4`}>
                  <i className={`fa-solid ${icon} text-xl text-${color}-600`}></i>
                </div>
                <div className="flex-grow">
                  <p className={`font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notif.date}</p>
                </div>
                {!notif.read && (
                  <div className="ml-4 flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-${color}-500 text-white`}>NEW</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm border">
            <i className="fa-solid fa-check-circle text-4xl text-green-500"></i>
            <p className="mt-4 text-gray-600 font-semibold">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}