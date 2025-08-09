import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const url = `${API_URL}/api/users/register`;
      await axios.post(url, user);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cafe-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-cafe-200">
        {/* Header */}
        <div className="bg-cafe-700 p-6 text-center">
          <h2 className="text-2xl font-light text-white">Create Your Account</h2>
          <p className="text-cafe-200 mt-1">Join our cafe community</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 mx-6 mt-6 rounded-md ${
            message.includes("successful") ? 
            "bg-green-100 text-green-700 border-l-4 border-green-500" : 
            "bg-red-100 text-red-700 border-l-4 border-red-500"
          }`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-cafe-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                placeholder="John"
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-cafe-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="Doe"
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cafe-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cafe-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              required
              minLength="6"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-cafe-600 hover:bg-cafe-700 text-black font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
            >
              Register
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-cafe-100 px-6 py-4 text-center border-t border-cafe-200">
          <p className="text-sm text-cafe-700">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-cafe-600 hover:text-cafe-800 font-medium transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}