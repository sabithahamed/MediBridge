import { useEffect } from 'react';

export default function SuccessDialog({ message, onClose }) {
  // Automatically close the dialog after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center"
      style={{ animation: 'slideIn 0.5s forwards' }}
    >
      <i className="fa-solid fa-check-circle mr-3 text-xl"></i>
      <p className="font-semibold">{message}</p>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}