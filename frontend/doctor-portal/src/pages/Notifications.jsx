import Card from "../components/Card";
import { notifications } from "../data/mockData";

export default function Notifications() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600">Your recent alerts and messages</p>
      </div>
      
      <Card title="All Notifications">
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-lg border border-gray-200 ${notif.read ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between items-start">
                <p className={`font-medium ${notif.read ? 'text-gray-800' : 'text-blue-800'}`}>
                  {notif.message}
                </p>
                {!notif.read && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{notif.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}