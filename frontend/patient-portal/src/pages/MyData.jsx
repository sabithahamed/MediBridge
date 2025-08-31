// src/pages/MyData.jsx
import Card from "../components/Card";

export default function MyData() {
  return (
    <Card title="Patient Summary">
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <i className="fa-solid fa-id-card-clip text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold">Name</p>
            <p className="text-gray-600">John Doe</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <i className="fa-solid fa-cake-candles text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold">Age</p>
            <p className="text-gray-600">30</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <i className="fa-solid fa-heart-pulse text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold">Chronic Conditions</p>
            <p className="text-gray-600">Hypertension</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <i className="fa-solid fa-hand-dots text-blue-500 text-2xl"></i>
          <div>
            <p className="font-semibold">Allergies</p>
            <p className="text-gray-600">None</p>
          </div>
        </div>
      </div>
    </Card>
  );
}