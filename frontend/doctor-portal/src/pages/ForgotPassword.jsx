import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (email) {
      alert(`Password reset instructions sent to ${email}`);
      setEmail("");
    } else {
      alert("Please enter your email address");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-pink-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 max-w-sm w-full text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center mb-6 text-gray-700">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleReset}
          className="w-full py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors mb-4"
        >
          Send Reset Instructions
        </button>
        <Link 
          to="/" 
          className="block text-center text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}