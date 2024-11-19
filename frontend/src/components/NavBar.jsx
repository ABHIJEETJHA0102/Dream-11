import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function NavBar() {

  const handleLanguageClick = () => {
    toast("Language selection is currently disabled.");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#870000] to-[#3d0000] text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center space-x-3">
          <span>🏆</span>
          <span>DREAM11</span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-6">
          {/* Placeholder for future items */}
          <input
            type="text"
            placeholder="Search matches..."
            className="hidden sm:block px-4 py-2 rounded-lg bg-[#2c0a0a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <button
            className="bg-[#e63946] px-5 py-2 rounded-full shadow-md text-white hover:opacity-90 focus:outline-none flex items-center space-x-2"
            onClick={handleLanguageClick}
          >
            <span>English</span>
            <span>▾</span>
          </button>
        </div>
      </div>
    </div>
  );
}
