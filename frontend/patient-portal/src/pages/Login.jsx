import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(inputValue) && inputValue.length > 0) {
      setEmailError("Please enter a valid email format.");
    } else if (!inputValue.endsWith("@gmail.com") && inputValue.length > 0) {
      setEmailError("Please use a valid @gmail.com email address.");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (emailError) {
      alert("Please fix the email format before logging in.");
      return;
    }
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true); // notify App.jsx
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-indigo-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 max-w-sm w-full border border-white/30 flex flex-col justify-center text-gray-800">
        
        <div className="flex flex-col items-center justify-center mb-6">
          <i className="fa-solid fa-bridge text-4xl text-gray-700 mb-2 transform hover:scale-110 transition-transform duration-300"></i>
          <h1 className="text-3xl font-bold text-gray-800">MediBridge</h1>
        </div>

        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-center text-sm text-gray-700 mb-6">Access your patient portal</p>

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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-12 bg-white/40 rounded-xl placeholder-gray-600 outline-none focus:ring-2 focus:ring-white border border-transparent focus:border-white/50 transition-all duration-300"
            />
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-4">
          <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-gray-700 hover:text-blue-700 transition-colors duration-300">Forgot Password?</Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 mt-6 bg-white/40 rounded-xl font-bold text-gray-800 shadow-md hover:bg-white/50 active:scale-95 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center text-xs mt-6 text-gray-800">
          Don't have an account? <Link to="/signup" className="font-semibold hover:text-blue-700 transition-colors duration-300">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
