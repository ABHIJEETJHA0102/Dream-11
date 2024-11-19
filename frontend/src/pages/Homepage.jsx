<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
>>>>>>> 889fddc6b1d7ce3ddf521e585b2f86429a85182d

export default function Homepage() {
  const [matches, setMatches] = useState([]);
  const nav = useNavigate();
<<<<<<< HEAD

  const handleCreateTeamClick = () => {
    nav(`/selectteam`);
  };

  const handleMoreMatchesClick = () => {
    toast('More matches functionality coming soon!');
  };

  useEffect(() => {
    // Simulate API call
    const fetchMatches = async () => {
      const response = await fetch('http://127.0.0.1:8000/getMatches'); // Replace 'url' with your API endpoint
      console.log(response);
      const data = await response.json(); // Assuming the API returns the sample matches array
      console.log(data.matches);
      setMatches(data.matches);
    };

    fetchMatches().catch((err) => console.error('Error fetching matches:', err));
  }, []);
=======
  const handleCreateTeamClick = () => {
    // toast("Create your team functionality coming soon!");
    nav("/selectteam");
  };

  const handleMoreMatchesClick = () => {
    toast("More matches functionality coming soon!");
  };
  const teams={
    
  }
>>>>>>> 889fddc6b1d7ce3ddf521e585b2f86429a85182d

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <h1 className="text-5xl mb-12 font-extrabold text-center leading-tight">
        Create your <span className="text-[#ff6b6b]">dream squad</span> today!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Match Cards */}
<<<<<<< HEAD
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="bg-[#2c0a0a] rounded-xl shadow-xl border border-[#ff6b6b] p-6 transform hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-center mb-4 text-lg font-medium">
              <span>{match.teams.split('vs')[0].trim()}</span>
              <span>{match.teams.split('vs')[1].trim()}</span>
            </div>
            <p className="mb-2 text-sm font-light text-gray-300">{match.date}</p>
            <p className="mb-6 text-sm text-gray-400">
              {match.time} | {match.venue}
            </p>
            <button
              className="w-full bg-[#e63946] px-6 py-3 rounded-lg font-semibold shadow hover:bg-opacity-90 transition"
              onClick={() => handleCreateTeamClick()}
=======
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
>>>>>>> 889fddc6b1d7ce3ddf521e585b2f86429a85182d
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
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 889fddc6b1d7ce3ddf521e585b2f86429a85182d
