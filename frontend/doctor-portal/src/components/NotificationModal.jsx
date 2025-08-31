import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function NotificationModal({ notification, onClose }) {
  if (!notification) return null;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    navigate(`/doctor/notifications/${notification.id}-${randomId}`);
  };

  const handleModalContentClick = (e) => e.stopPropagation();

  return (
    // Modal Backdrop - THIS IS THE UPDATED LINE
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-6 transform transition-transform duration-300 scale-95"
        onClick={handleModalContentClick}
        style={{ animation: 'zoomIn 0.3s forwards' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Notification Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl">&times;</button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-lg text-gray-800 mb-2">
            <strong>Message:</strong> {notification.message}
          </p>
          <p className="text-md text-gray-500 mb-4">
            <strong>Date:</strong> {notification.date}
          </p>

          <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">Associated Details:</h4>
            <p className="text-sm text-gray-600"><strong>Patient:</strong> {notification.message.includes("John Doe") ? "John Doe" : "Jane Smith"}</p>
            <p className="text-sm text-gray-600"><strong>Priority:</strong> <span className={notification.read ? "text-green-600" : "text-red-600 font-bold"}>{notification.read ? "Low" : "High"}</span></p>
            <p className="text-sm text-gray-600"><strong>Action Required:</strong> {notification.read ? "None" : "Review Patient Chart Immediately"}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Close
          </button>
          <button
            onClick={handleViewDetails}
            className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            View Full Details <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )}