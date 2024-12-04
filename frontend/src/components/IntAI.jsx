import React, { useState } from 'react';
import { Loader, ChevronLeft } from 'lucide-react';

const IntAI = ({ selectedTeam, setSelectedTeam, availablePlayers, setAvailablePlayers }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const plans = [
    { title: "Predict Top Player", number: 1, route: 'getone' },
    { title: "Predict Top 5 Players", number: 5, route: 'getfive' },
    { title: "Predict Top 11 Players", number: 11, route: 'geteleven' },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setActive(-1);
    setPredictions([]);
    setOpen(false);
  };

  const handleGoBack = () => {
    setActive(-1);
    setPredictions([]);
  };

  const fetchPredictions = async (route, planNumber) => {
    setLoading(true);
    setActive(planNumber);

    try {
      const response = await fetch(`http://localhost:8000/${route}`);
      const data = await response.json();
      setPredictions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTeam = (player) => {
    if (!player || !player.player_name) return;

    // Add player to selectedTeam if not already present
    setSelectedTeam((prev) => {
      if (prev.some((p) => p.player_name === player.player_name)) return prev;
      return [...prev, player];
    });

    // Remove player from availablePlayers
    setAvailablePlayers((prev) => prev.filter((p) => p.player_name !== player.player_name));

    setOpen(false); // Close dialog after adding
  };

  const renderPredictionCard = (player, index) => {
    const bgColors = ['from-red-900 to-red-800', 'from-red-800 to-red-700', 'from-red-700 to-red-600'];
    const colorIndex = index % bgColors.length;

    return (
      <div
        key={player.player_name}
        className={`bg-gradient-to-r ${bgColors[colorIndex]} p-4 rounded-lg flex items-center justify-center shadow-md  transform transition`}
      >
        <div className='w-[70%] mr-4'>
          <h3 className="text-xl font-bold text-white">{player.player_name}</h3>
          <div className="text-sm text-red-200 ">{player.explanation}</div>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="bg-red-600 text-white px-3 py-2 rounded-full font-bold">
            {player.predicted_fantasy_points}
          </span>
          <button
            onClick={() => handleAddToTeam(player)}
            className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-full"
          >
            Add to Team
          </button>
        </div>
      </div>
    );
  };

  const renderPlanContent = (plan) => {
    if (loading && plan.number === active) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="animate-spin text-white w-12 h-12" />
          <p className="text-white text-lg font-semibold">Generating AI Insights...</p>
        </div>
      );
    }

    if (predictions.length > 0 && plan.number === active) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center text-white bg-red-700 hover:bg-red-600 px-3 py-2 rounded-full"
            >
              <ChevronLeft /> Go Back
            </button>
            <h2 className="text-2xl font-bold text-white">Top {plan.number} Players</h2>
          </div>
          <div className="max-h-[500px] overflow-y-auto space-y-4 custom-scrollbar">
            {predictions.map(renderPredictionCard)}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-red-700 p-6 rounded-lg flex justify-between items-center shadow-md">
        <div>
          <h3 className="text-xl font-bold text-white">{plan.title}</h3>
          <p className="text-sm text-red-200">Predict {plan.number} Players</p>
        </div>
        <button
          onClick={() => fetchPredictions(plan.route, plan.number)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
        >
          Predict
        </button>
      </div>
    );
  };

  return (
    <div className="text-center mt-4">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #870000, #3d0000);
          border-radius: 4px;
        }
      `}</style>
      <button
        onClick={handleOpen}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
      >
        AI-Powered Fantasy Insights ✨
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-red-900 to-red-700 text-white w-[90%] md:w-[70%] lg:w-[65%] max-h-[90vh] overflow-hidden rounded-lg shadow-xl p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">AI Insights for Your Fantasy Team</h2>
            <div className="space-y-6">
              {plans.map((plan) =>
                (active === plan.number || active === -1) && (
                  <div key={plan.number}>{renderPlanContent(plan)}</div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntAI;
