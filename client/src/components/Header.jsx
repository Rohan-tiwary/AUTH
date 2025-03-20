import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/Leaderboard"); // Assuming you have a route for leaderboard
    }
  }, [userData, navigate]);

  if (userData) {
    return null; // This will prevent rendering the welcome message if userData is present
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white px-6 sm:px-0 bg-[url(https://wallpapercave.com/wp/wp6656168.jpg)] bg-cover bg-center">
      {/* Content Container */}
      <div className="max-w-lg w-full bg-gradient-to-b from-gray-900 to-black p-10 rounded-lg shadow-2xl text-center space-y-6 border border-gray-700">
        {/* Avatar Section */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-neon-green overflow-hidden shadow-lg">
            <img
              src="https://i.ytimg.com/vi/Mwd15bFsqLE/maxresdefault.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-extrabold text-neon-green drop-shadow-lg">
          Welcome to SENA
        </h1>

        {/* Greeting */}
        <h2 className="text-lg sm:text-xl flex items-center justify-center gap-2 text-gray-300">
          Hey <span className="text-neon-blue">Developer</span>!!
          <img className="w-8 aspect-square animate-pulse" src={assets.hand_wave} alt="Wave" />
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          Let’s get started with quick beta testing and we’ll be having a chicken dinner!
        </p>

        {/* Get Started Button */}
        <button className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 font-medium transition-transform transform hover:scale-105 hover:shadow-lg">
  Get Started
</button>

      </div>
    </div>
  );
};

export default Header;
