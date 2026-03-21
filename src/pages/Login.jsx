import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await axios.post(
    "http://localhost:5731/login",
    { username, password },
    { withCredentials: true }
  );

  if (response.data.message === "Login successful") {
    setError(""); // clear error
    navigate("/");
  }
} catch (err) {
  const message = err.response?.data?.message || "Invalid credentials";
  setError(message); // ✅ store error instead of alert
}
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-400">
      <div className="w-96 px-8 py-5 rounded-xl 
        bg-white/10 backdrop-blur-lg 
        border border-white/20 
        shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-white text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2 rounded-md 
              bg-white/20 text-white placeholder-gray-200 
              border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 rounded-md 
              bg-white/20 text-white placeholder-gray-200 
              border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
  <p className="text-red-500 text-sm mt-1">
    {error}
  </p>
)}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer
            shadow-lg hover:bg-blue-700
            active:scale-95 active:shadow-md
            transition-all duration-150">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-500 font-bold">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;