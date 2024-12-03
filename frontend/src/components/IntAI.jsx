import React, { useState } from 'react';

const IntAI = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setActive(-1);
    setOpen(false);
  };
  const [active, setActive] = useState(-1);
  const plans = [
    { title: "Predict Top Player", number: 1, route: 'getone' },
    { title: "Predict Top 5 Players ", number: 5 , route: 'getfive'},
    { title: "Predict Top 11 Players ", number: 11, route: 'geteleven' },
  ];

  const [predictions,setPredctions] = useState([]);

  const [loading, setloading] = useState(false);
  const UpdateDropBox = async (route,planNumber) => {
    setloading(true);
    setActive(planNumber);
    const res = await fetch(`http://localhost:8000/${route}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            return data['predictions'];
        });
    setPredctions(res);

    console.log(predictions);
    setloading(false);
    };


  const planCard = (plan) => {
    if(loading && plan.number === active){
        return <div className="bg-[#870000] p-6 rounded-lg flex justify-between items-center shadow-md cursor-pointer"> <p className="font-bold text-xl text-center text-white hover:underline">Loading...</p></div>    
    }

    if(predictions && predictions.length > 0 && plan.number === active){
        return (
            predictions.map((player) => (
                <div key = {player.player_name} className="bg-[#870000] w-full my-1 p-6 rounded-lg flex justify-between items-center shadow-md cursor-pointer">
                    <p className="font-bold text-xl text-center text-white hover:underline">{player.player_name}</p>
                    <p className="text-sm text-gray-300 text-center">{player.predicted_fantasy_points} Points</p>
                </div>
                )
            )
        )
    }
    else if(active === -1){
        return (
          <div className="bg-[#870000] p-6 w-full rounded-lg flex justify-between items-center shadow-md cursor-pointer">
            <div className="mb-4">
              <p className="font-bold text-xl text-center text-white hover:underline">{plan.title}</p>
              <p className="text-sm text-gray-300 text-center">Predict {plan.number} Players For My Team</p>
            </div>
            <button onClick = {() => UpdateDropBox(plan.route,plan.number)} className="px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors">
              Predict
            </button>
          </div>
        );
    }
  };

  return (
    <div className="mt-4 text-center p-1">
      <button
        onClick={handleClickOpen}
        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
      >
        AI-Powered Fantasy Insights ✨
      </button>

      {open && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#3d0000] to-[#870000] overflow-y-scroll text-white  rounded-lg shadow-lg transform transition-transform scale-95 w-[80%] max-h-4 min-h-[700px] md:w-[50%] py-6 px-4">
            <button
              className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500"
              onClick={handleClose}
            >
              x
            </button>
            <div className="p-4 text-lg font-semibold border-b text-center">AI Insights for Your Fantasy Team</div>

            <div className="grid grid-cols-1 sm:grid-rows-3 lg:grid-rows-3 gap-4 py-4">
                {plans.map((plan) => (
                    (active === plan.number || active === -1) && (
                    <div key={plan.number} className="flex justify-start flex-col items-start">
                        {planCard(plan)}
                    </div>
                    )
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntAI;
