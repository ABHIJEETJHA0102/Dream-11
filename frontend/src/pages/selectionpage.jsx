import React, { useState } from "react";
import "../App.css";
import IntAI from "../components/IntAI";
import { players } from "../assets/generate";
import { toast } from 'react-toastify';

export default function TeamSelection() {
  const [availablePlayers, setAvailablePlayers] = useState(players);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle adding a player to the selected team
  const handleAddPlayer = (player) => {
    if (selectedTeam.length >= 11) {
      toast("🔥 No more places in your team remaining!");
      return;
    }
    setSelectedTeam([...selectedTeam, player]);
    setAvailablePlayers(availablePlayers.filter((p) => p.id !== player.id));
  };

  // Handle removing a player from the selected team
  const handleRemovePlayer = (player) => {
    setAvailablePlayers([...availablePlayers, player]);
    setSelectedTeam(selectedTeam.filter((p) => p.id !== player.id));
  };

  // Handle clicking on a player's card to open the dialog
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsDialogOpen(true);
  };

  // Close the player details dialog
  const closeDialog = () => {
    setSelectedPlayer(null);
    setIsDialogOpen(false);
  };

  // Show a toast message
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000); // Clear after 3 seconds
  };

  // Filter available players based on the search query
  const filteredPlayers = availablePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render player cards for both available and selected lists
  const renderPlayerCard = (player, isAvailable = true) => (
    <div
      key={player.id}
      className="bg-[#870000] p-4 rounded-lg flex justify-between items-center shadow-md cursor-pointer"
      onClick={() => handlePlayerClick(player)}
      role="button"
      tabIndex={0}
    >
      <div>
        <p className="font-bold hover:underline">{player.name}</p>
        <p className="text-sm text-gray-300">
          {player.role} · {player.team} · Expected Points - {player.points}
        </p>
      </div>
      <button
        className={`px-4 py-2 rounded-full text-white ${
          isAvailable ? "bg-red-500" : "bg-gray-500"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          isAvailable ? handleAddPlayer(player) : handleRemovePlayer(player);
        }}
      >
        {isAvailable ? "Add" : "Remove"}
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#3d0000] to-[#870000] text-white p-6"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h1 className="text-4xl font-bold text-center my-8">
        Select your <span className="text-red-400">team</span>
      </h1>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md text-center">
          {toastMessage}
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Players */}
        <div className="bg-[#2c0a0a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Available Players</h2>
          <div className="space-y-4 h-80 overflow-y-auto dialog-scroll">
            {filteredPlayers.map((player) => renderPlayerCard(player, true))}
          </div>
          <input
            type="text"
            placeholder="Search Player"
            className="mt-4 w-full px-4 py-2 rounded-lg bg-[#1a0000] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Selected Team */}
        <div className="bg-[#2c0a0a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
          <div className="space-y-4 h-80 overflow-y-auto dialog-scroll">
            {selectedTeam.map((player) => renderPlayerCard(player, false))}
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gradient-to-b from-[#3d0000] to-[#870000] text-white rounded-lg shadow-lg p-8 max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500"
              onClick={closeDialog}
            >
              ✕
            </button>
            <div className="flex space-x-6">
              <div className="flex flex-col items-center flex-1">
                <img
                  src={selectedPlayer.avatar}
                  alt={selectedPlayer.name}
                  className="w-32 h-32 rounded-full mb-4 shadow-md"
                />
                <button className="bg-red-500 px-4 py-2 rounded text-sm text-white hover:bg-red-600">
                  ▶ Play
                </button>
                <div className="mt-4 bg-black bg-opacity-30 p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold">
                    {selectedPlayer.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    {selectedPlayer.stats.description}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Player Details</h2>
                <div className="mb-4">
                  <p className="text-sm">
                    Feature 1: {selectedPlayer.features[0]}
                  </p>
                  <p className="text-sm">
                    Feature 2: {selectedPlayer.features[1]}
                  </p>
                  <p className="text-sm">
                    Feature 3: {selectedPlayer.features[2]}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <p className="font-bold">Rating:</p>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < Math.round(selectedPlayer.rating)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="font-bold">Best Formats:</p>
                  <p>T20, ODI</p>
                </div>
                <div className="bg-black bg-opacity-30 p-3 rounded-md">
                  <p>Team: {selectedPlayer.team}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <IntAI
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        availablePlayers={availablePlayers}
        setAvailablePlayers={setAvailablePlayers}
      />
    </div>
  );
}
