import React from "react";
import "./App.css";

function App() {
  const handleLanguageClick = () => {
    alert("Language selection is currently disabled.");
  };

  const handleCreateTeamClick = () => {
    alert("Create your team functionality coming soon!");
  };

  const handleMoreMatchesClick = () => {
    alert("More matches functionality coming soon!");
  };

  return (
    <div className="bg-gradient-to-b from-red-900 to-red-700 text-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-red-800">
        <div className="text-2xl font-bold">🏆 DREAM11</div>
        <button
          className="bg-red-600 px-4 py-2 rounded text-white"
          onClick={handleLanguageClick}
        >
          English ▾
        </button>
      </div>

      {/* Main Content */}
      <div className="px-10 py-6 max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 font-bold">
          Make your <span className="text-red-500">squad</span> now
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Match Cards */}
          {[1, 2, 3, 4].map((match, index) => (
            <div
              key={index}
              className="bg-red-800 rounded-lg p-4 shadow-lg border-2 border-white"
            >
              <div className="flex justify-between mb-2">
                <span>🇬🇧 England</span>
                <span>🇩🇪 Germany</span>
              </div>
              <p className="mb-1">END T20 MATCH 2022</p>
              <p className="mb-4 text-sm">5:45 PM | July 5, 2022</p>
              <button
                className="bg-red-500 px-4 py-2 rounded text-white"
                onClick={handleCreateTeamClick}
              >
                Create your team
              </button>
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-red-600 px-6 py-3 rounded text-white"
          onClick={handleMoreMatchesClick}
        >
          More matches ▾
        </button>
      </div>
    </div>
  );
}

export default App;
