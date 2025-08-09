import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen bg-cafe-50">
      {/* Navigation Bar */}
      <nav className="bg-cafe-900 text-cafe-100 p-4 shadow-md">
        <div className="container mx-auto flex space-x-6">
          <Link 
            to="/admin" 
            className="px-3 py-2 rounded-md hover:bg-cafe-800 transition-colors duration-200 font-medium"
            activeClassName="bg-cafe-700"
          >
            Users
          </Link>
          <Link 
            to="/admin/products" 
            className="px-3 py-2 rounded-md hover:bg-cafe-800 transition-colors duration-200 font-medium"
            activeClassName="bg-cafe-700"
          >
            Products
          </Link>
          <Link 
            to="/admin/orders" 
            className="px-3 py-2 rounded-md hover:bg-cafe-800 transition-colors duration-200 font-medium"
            activeClassName="bg-cafe-700"
          >
            Orders
          </Link>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-cafe-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}