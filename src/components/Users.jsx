import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users);
      setTotalPages(Math.ceil(result.data.total / limit));
      setError();
    } catch (err) {
      console.log(err);
      setError("Failed to load users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Failed to delete user");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/`;
      await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", // Don't pre-fill password
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/${editId}`;
      await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User updated successfully");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-light text-cafe-800 mb-6 border-b pb-2 border-cafe-200">
        User Management
      </h2>

      {/* Error/Success Message */}
      {error && (
        <div className={`mb-6 p-4 rounded-md ${
          error.includes("successfully") ? 
          "bg-green-100 text-green-700 border-l-4 border-green-500" : 
          error === "Loading..." ?
          "bg-blue-100 text-blue-700 border-l-4 border-blue-500" :
          "bg-red-100 text-red-700 border-l-4 border-red-500"
        }`}>
          {error}
        </div>
      )}

      {/* User Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-cafe-200">
        <form ref={frmRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-cafe-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-cafe-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cafe-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cafe-700 mb-1">
              Password {editId && "(leave blank to keep current)"}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required={!editId}
              minLength="6"
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-cafe-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            >
              <option value="">-- Select Role --</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-2">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-cafe-600 hover:bg-cafe-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Update User
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-cafe-200 hover:bg-cafe-300 text-cafe-800 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-cafe-600 hover:bg-cafe-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add User
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search users..."
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
            <button
              onClick={fetchUsers}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cafe-600 hover:bg-cafe-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium text-cafe-700">
            Users per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-cafe-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-500"
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-cafe-200 mb-6">
        <table className="min-w-full divide-y divide-cafe-200">
          <thead className="bg-cafe-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cafe-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-cafe-600">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-cafe-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-cafe-800">{user.firstName} {user.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cafe-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-cafe-200 text-cafe-800' : 'bg-cafe-100 text-cafe-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-accent-500 hover:text-accent-700 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-cafe-200 pt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Previous
        </button>
        <span className="text-sm text-cafe-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-md ${page === totalPages || totalPages === 0 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}