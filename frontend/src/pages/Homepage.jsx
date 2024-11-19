import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Homepage() {
  const nav = useNavigate();
    const handleCreateTeamClick = () => {
        // toast("Create your team functionality coming soon!");
        nav("/selectteam")
      };
    
      const handleMoreMatchesClick = () => {
        toast("More matches functionality coming soon!");
      };
    
  return (
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
  )
}
