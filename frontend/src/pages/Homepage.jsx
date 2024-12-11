import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CSVUpload from '../components/CSVUpload';

export default function Homepage() {
  const [matches, setMatches] = useState([]);
  const nav = useNavigate();

  const handleCreateTeamClick = () => {
    nav(`/selectteam`);
  };

  const handleMoreMatchesClick = () => {
    toast('More matches functionality coming soon!');
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('http://127.0.0.1:8000/getMatches'); // Replace 'url' with your API endpoint
      console.log('got_response:', response);
      const data = await response.json(); // Assuming the API returns the sample matches array
      console.log(data.matches);
      setMatches(data.matches);
    };

    fetchMatches().catch((err) => console.error('Error fetching matches:', err));
  }, []);

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <h1 className="text-5xl mb-12 font-extrabold text-center leading-tight">
        Create your <span className="text-[#ff6b6b]">dream squad</span> today!
      </h1>
      <div className="flex flex-col items-center my-4"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">
        Check on your <span className="text-red-400">CSV</span>
      </h1>
      <button
        onClick={openUploadModal}
        className="bg-red-500 px-6 py-3 rounded-full text-white text-lg hover:bg-red-400 transition-all"
      >
        Upload CSV
      </button>

      {/* Render CSVUpload modal */}
      {isUploadModalOpen && <CSVUpload onClose={closeUploadModal} />}
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.length > 0 ? (
          // Match Cards
          matches.map((match) => (
            <div
              key={match.match_id}
              className="bg-[#2c0a0a] rounded-xl shadow-xl border border-[#ff6b6b] p-6 transform hover:scale-105 transition-transform"
            >
              <div className="flex justify-between items-center mb-4 text-lg font-medium">
                <span>{match.team1}</span>
                <span>{match.team2}</span>
              </div>
              <p className="mb-2 text-sm font-light text-gray-300">{match.date}</p>
              <p className="mb-6 text-sm text-gray-400">
                {match.time} | {match.venue}
              </p>
              <button
                className="w-full bg-[#e63946] px-6 py-3 rounded-lg font-semibold shadow hover:bg-opacity-90 transition"
                onClick={() => handleCreateTeamClick()}
              >
                Create your team
              </button>
            </div>
          ))
        ) : (
          // No matches available
          <p className="text-center text-gray-500 col-span-3">
            No matches available at the moment.
          </p>
        )}
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
}
