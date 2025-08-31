// src/pages/Dashboard.jsx
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 dashboard-container">
          <div>
            <Card title="Latest Symptoms">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <i className="fa-solid fa-head-side-mask text-blue-500 text-2xl"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Headache</p>
                    <p className="text-gray-600 text-sm">Severity: <span className="font-bold text-blue-600">Mild</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                  <i className="fa-solid fa-thermometer-half text-red-500 text-2xl"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Fever</p>
                    <p className="text-gray-600 text-sm">Severity: <span className="font-bold text-red-600">High</span></p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card title="Medication Tracker">
              <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-green-50 rounded-lg">
                <i className="fa-solid fa-pills text-green-500 text-4xl"></i>
                <p className="text-gray-700 text-lg">You have a **80%** adherence rate.</p>
                <p className="text-gray-500 text-sm">2 medications tracked.</p>
              </div>
            </Card>
          </div>
          <div>
            <Card title="Notifications">
              <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-gray-50 rounded-lg">
                <i className="fa-solid fa-bell text-gray-400 text-4xl"></i>
                <p className="text-gray-500 text-lg text-center">You are all caught up! No new notifications.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}