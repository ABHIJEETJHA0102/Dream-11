import React, { useState } from "react";
import "../App.css"

export default function TeamSelection() {
  const [availablePlayers, setAvailablePlayers] = useState([
    { id: 1, name: "Rohit Sharma", points: 100, role: "Batter" },
    { id: 2, name: "Jasprit Bumrah", points: 85, role: "Bowler" },
    { id: 3, name: "Hardik Pandya", points: 120, role: "All-rounder" },
    { id: 4, name: "Surya Kumar Yadav", points: 120, role: "Batter" },
    { id: 5, name: "Tilak Verma", points: 120, role: "Batter" },
  ]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add a player to the team
  const handleAddPlayer = (player) => {
    setSelectedTeam([...selectedTeam, player]);
    setAvailablePlayers(availablePlayers.filter((p) => p.id !== player.id));
  };

  // Function to remove a player from the team
  const handleRemovePlayer = (player) => {
    setAvailablePlayers([...availablePlayers, player]);
    setSelectedTeam(selectedTeam.filter((p) => p.id !== player.id));
  };

  // Filter available players based on search query
  const filteredPlayers = availablePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#3d0000] to-[#870000] text-white p-6"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Main Content */}
      <h1 className="text-4xl font-bold text-center my-8">
        Select your <span className="text-red-400">team</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Players */}
        <div className="bg-[#2c0a0a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Available Players</h2>
          <div className="space-y-4 h-80 overflow-y-auto dialog-scroll">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-[#870000] p-4 rounded-lg flex justify-between items-center shadow-md"
              >
                <div>
                  <p className="font-bold">{player.name}</p>
                  <p className="text-sm text-gray-300">
                    {player.role} · {player.points} points
                  </p>
                </div>
                <button
                  className="bg-red-500 px-4 py-2 rounded-full text-white"
                  onClick={() => handleAddPlayer(player)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Player name"
            className="mt-4 w-full px-4 py-2 rounded-lg bg-[#1a0000] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Selected Team */}
        <div className="bg-[#2c0a0a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
          <div className="space-y-4 h-80 overflow-y-auto dialog-scroll">
            {selectedTeam.map((player) => (
              <div
                key={player.id}
                className="bg-[#870000] p-4 rounded-lg flex justify-between items-center shadow-md"
              >
                <div>
                  <p className="font-bold">{player.name}</p>
                  <p className="text-sm text-gray-300">
                    {player.role} · {player.points} points
                  </p>
                </div>
                <button
                  className="bg-red-500 px-4 py-2 rounded-full text-white"
                  onClick={() => handleRemovePlayer(player)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
