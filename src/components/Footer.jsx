import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-cafe-900 text-cafe-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Logo or Brand Name */}
          <h3 className="text-2xl font-light tracking-wider mb-4 border-b border-cafe-700 pb-2">
            Café
          </h3>
          
          {/* Footer Navigation (optional) */}
          <div className="flex space-x-6 mb-4">
            <a href="#" className="hover:text-accent-300 transition-colors">About</a>
            <a href="#" className="hover:text-accent-300 transition-colors">Contact</a>
            <a href="#" className="hover:text-accent-300 transition-colors">Privacy</a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-cafe-400">
            &copy; {new Date().getFullYear()} Café. All rights reserved.
          </p>
          
          {/* Social Icons (optional) */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-cafe-300 hover:text-accent-300 transition-colors">
              <span className="sr-only">Instagram</span>
              <i className="fas fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-cafe-300 hover:text-accent-300 transition-colors">
              <span className="sr-only">Twitter</span>
              <i className="fas fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-cafe-300 hover:text-accent-300 transition-colors">
              <span className="sr-only">Facebook</span>
              <i className="fas fa-facebook text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}