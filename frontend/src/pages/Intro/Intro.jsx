import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="relative w-screen h-screen bg-[#1e1e1e] overflow-hidden flex items-center justify-center px-6">
      {/* Background SVG Blob */}
      <svg
        className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] blur-2xl opacity-20 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#C1A57B"
          d="M42.8,-58.7C55.8,-51.3,66.5,-37.6,69.1,-23.1C71.7,-8.6,66.3,6.7,59.3,20.4C52.3,34.1,43.6,46.2,31.7,54.7C19.9,63.1,5,68,-10.3,69.6C-25.6,71.1,-41.3,69.2,-50.3,59.6C-59.3,50,-61.6,32.7,-64.1,16.8C-66.6,0.9,-69.2,-13.6,-63.7,-25.4C-58.3,-37.2,-44.8,-46.3,-31.1,-53.1C-17.3,-59.8,-3.2,-64.1,11.6,-68.6C26.4,-73.2,42.8,-67.2,42.8,-58.7Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 bg-[#2a1d1d]/70 backdrop-blur-md border border-[#4d3b3b] rounded-3xl shadow-2xl px-12 py-16 max-w-3xl text-center">
        <h1 className="text-6xl font-extrabold text-[#f5f5f5] leading-tight mb-6">
          Welcome to <span className="text-[#C1A57B]">Our Platform</span>
        </h1>
        <p className="text-[#d1cfcf] text-xl leading-relaxed mb-10">
          Build secure and beautiful experiences. Designed with precision,
          focused on performance, and styled with elegance.
        </p>

        <div className="flex gap-6 justify-center">
          <button className="bg-[#C1A57B] text-[#1e1e1e] font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-[#e2c89e] transition-all duration-300">
            <Link to="/signup">Get Started</Link>
          </button>
          <button className="border border-[#C1A57B] text-[#C1A57B] text-lg px-8 py-4 rounded-2xl hover:bg-[#2e1d1d] transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
