import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);
  
  return (
    <header className="bg-cafe-800 text-cafe-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-light tracking-wider hover:text-accent-300 transition-colors mb-4 md:mb-0">
          Café MERN
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-1 md:space-x-4 flex-wrap justify-center">
          <Link 
            to="/" 
            className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
          >
            Home
          </Link>
          
          <span className="text-cafe-500 hidden md:inline">•</span>
          
          <Link 
            to="/cart" 
            className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
          >
            My Cart
          </Link>
          
          <span className="text-cafe-500 hidden md:inline">•</span>
          
          <Link 
            to="/order" 
            className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
          >
            My Orders
          </Link>
          
          {user?.role === "admin" && (
            <>
              <span className="text-cafe-500 hidden md:inline">•</span>
              <Link 
                to="/admin" 
                className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
              >
                Admin
              </Link>
            </>
          )}
          
          <span className="text-cafe-500 hidden md:inline">•</span>
          
          {user?.token ? (
            <Link 
              to="/profile" 
              className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
            >
              Profile
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="px-3 py-2 rounded hover:bg-cafe-700 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}