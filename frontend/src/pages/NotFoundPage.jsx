import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/error.svg";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#3d0000] to-[#870000] text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Error Code and Message */}
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
        <p className="text-2xl mt-4 font-semibold">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-300">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <div className="mt-8">
        <img
          src={errorImage}
          alt="404 Error"
          className="w-64 mx-auto rounded-lg shadow-md"
        />
      </div>

      {/* Button to Return to Homepage */}
      <button
        className="mt-10 bg-red-600 px-6 py-3 rounded-full text-white font-bold shadow-lg hover:bg-red-500 hover:scale-105 transition transform"
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </button>
    </div>
  );
}
