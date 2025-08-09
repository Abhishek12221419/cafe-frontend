import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user._id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      // Initialize form with profile data
      setForm({
        firstName: result.data.firstName || "",
        lastName: result.data.lastName || "",
        email: result.data.email || "",
        password: ""
      });
    } catch (err) {
      console.log(err);
      setError("Failed to load profile. Please try again.");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchProfile();
    }
  }, [user]);

  const logout = () => {
    setUser({});
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${user._id}/profile`;
      await axios.post(url, form);
      fetchProfile();
      setError("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cafe-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {/* Header */}
        <div className="bg-cafe-700 p-6 text-center">
          <h3 className="text-2xl font-light text-white">My Profile</h3>
          <button 
            onClick={logout}
            className="mt-4 bg-cafe-800 hover:bg-cafe-900 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Error/Success Message */}
        {error && (
          <div className={`mx-6 mt-6 p-4 rounded-md ${
            error.includes("successfully") ? 
            "bg-green-100 text-green-700 border-l-4 border-green-500" : 
            "bg-red-100 text-red-700 border-l-4 border-red-500"
          }`}>
            {error}
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-cafe-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-cafe-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cafe-500 focus:border-cafe-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-cafe-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-cafe-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cafe-500 focus:border-cafe-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cafe-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-cafe-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cafe-500 focus:border-cafe-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cafe-700">
              New Password (leave blank to keep current)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-cafe-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cafe-500 focus:border-cafe-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-cafe-600 hover:bg-cafe-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}