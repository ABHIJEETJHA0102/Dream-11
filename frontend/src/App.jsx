import React from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import { toast } from 'react-toastify';

export default function App() {
  const handleLanguageClick = () => {
    toast("Language selection is currently disabled.");
  };

  const handleCreateTeamClick = () => {
    toast("Create your team functionality coming soon!");
  };

  const handleMoreMatchesClick = () => {
    toast("More matches functionality coming soon!");
  };

  return (
    <div
      className="bg-gradient-to-b from-[#3d0000] to-[#870000] text-white min-h-screen poppins"
      style={{
        background:
          "linear-gradient(180deg, #3d0000 0%, #870000 50%, #ff0000 100%)",
      }}
    >
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#870000] to-[#3d0000] text-white shadow-md">
  <div className="flex justify-between items-center px-6 py-4">
    {/* Logo Section */}
    <div className="text-3xl font-extrabold tracking-wide flex items-center space-x-3">
      <span>🏆</span>
      <span>DREAM11</span>
    </div>

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

      {/* Main Content */}
      <div className="px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-5xl mb-12 font-extrabold text-center leading-tight">
          Create your <span className="text-[#ff6b6b]">dream squad</span> today!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Match Cards */}
          {[1, 2, 3, 4].map((match, index) => (
            <div
              key={index}
              className="bg-[#2c0a0a] rounded-xl shadow-xl border border-[#ff6b6b] p-6 transform hover:scale-105 transition-transform"
            >
              <div className="flex justify-between items-center mb-4 text-lg font-medium">
                <span>🇬🇧 England</span>
                <span>🇩🇪 Germany</span>
              </div>
              <p className="mb-2 text-sm font-light text-gray-300">
                END T20 MATCH 2022
              </p>
              <p className="mb-6 text-sm text-gray-400">5:45 PM | July 5, 2022</p>
              <button
                className="w-full bg-[#e63946] px-6 py-3 rounded-lg font-semibold shadow hover:bg-opacity-90 transition"
                onClick={handleCreateTeamClick}
              >
                Create your team
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="bg-[#e63946] px-8 py-4 rounded-full text-lg font-bold shadow-md hover:opacity-90"
            onClick={handleMoreMatchesClick}
          >
            More matches ▾
          </button>
        </div>
      </div>
    </div>
  );
}
