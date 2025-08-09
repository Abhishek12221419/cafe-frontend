import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-cafe-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-cafe-200">
        {/* Header */}
        <div className="bg-cafe-700 p-6 text-center">
          <h2 className="text-2xl font-light text-white">Welcome Back</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cafe-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              placeholder="your@email.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cafe-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              placeholder="••••••••"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-cafe-600 hover:bg-cafe-700 text-black font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <div className="bg-cafe-100 px-6 py-4 text-center border-t border-cafe-200">
          <p className="text-sm text-cafe-700">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-cafe-600 hover:text-cafe-800 font-medium transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}