// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Function to validate and update the email state in real time
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputValue.length === 0) {
      setEmailError("");
    } else if (!emailRegex.test(inputValue)) {
      setEmailError("Please enter a valid email format.");
    } else if (!inputValue.endsWith("@gmail.com")) {
      setEmailError("Please use a valid @gmail.com email address.");
    } else {
      setEmailError("");
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;

    if (strength <= 2) {
      setPasswordStrength("Weak");
    } else if (strength <= 4) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handlePasswordReset = () => {
    if (emailError) {
      alert("Please fix the email format before resetting your password.");
      return;
    }

    if (email && newPassword && passwordStrength === "Strong") {
      alert("Your password has been reset successfully!");
      navigate("/");
    } else {
      alert("Please enter a valid email and a strong password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-indigo-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 max-w-sm w-full border border-white/30 flex flex-col justify-center text-gray-800">
        <div className="flex flex-col items-center justify-center mb-6">
          <i className="fa-solid fa-bridge text-4xl text-gray-700 mb-2 transform hover:scale-110 transition-transform duration-300"></i>
          <h1 className="text-3xl font-bold text-gray-800">MediBridge</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-center text-sm text-gray-700 mb-6">Enter your details to reset your password</p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 pl-12 bg-white/40 rounded-xl placeholder-gray-600 outline-none focus:ring-2 focus:ring-white border border-transparent focus:border-white/50 transition-all duration-300"
            />
            <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
            {emailError && <p className="text-red-500 text-xs mt-1 text-left">{emailError}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className="w-full p-3 pl-12 bg-white/40 rounded-xl placeholder-gray-600 outline-none focus:ring-2 focus:ring-white border border-transparent focus:border-white/50 transition-all duration-300"
            />
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
            <p
              className={`text-xs mt-1 text-left font-semibold transition-colors duration-300 ${
                passwordStrength === "Weak" ? "text-red-500" :
                passwordStrength === "Medium" ? "text-orange-500" :
                "text-green-500"
              }`}
            >
              {newPassword && `Strength: ${passwordStrength}`}
            </p>
          </div>
        </div>

        <button
          onClick={handlePasswordReset}
          className="w-full py-3 mt-6 bg-white/40 rounded-xl font-bold text-gray-800 shadow-md hover:bg-white/50 active:scale-95 transition-all duration-300"
        >
          Reset Password
        </button>

        <p className="text-center text-xs mt-6 text-gray-800">
          Remembered your password? <Link to="/" className="font-semibold hover:text-blue-700 transition-colors duration-300">Log in</Link>
        </p>
      </div>
    </div>
  );
}