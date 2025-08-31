import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("auth", "true");
      setAuth(true);
      navigate("/doctor/dashboard");
    } else {
      alert("Enter valid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-8 max-w-sm w-full text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">Doctor Portal</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
        <p className="text-center text-sm mt-4">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
}