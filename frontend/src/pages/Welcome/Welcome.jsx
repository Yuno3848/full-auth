import React from "react";

const Welcome = () => {
  return (
    <div className="bg-[#1e1e1e] w-[100vw] h-[100vh] flex items-center justify-center px-4">
      <div className="relative bg-[#3e2c2c] w-[420px] p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6">
        <svg
          className="absolute top-[-40px] left-1/2 -translate-x-1/2"
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle cx="32" cy="32" r="32" fill="#2e1d1d" />
          <path
            d="M21 43c0-6 10-6 10-12s-10-6-10-12 10-6 10-12"
            stroke="#C1A57B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M33 7c0 6 10 6 10 12s-10 6-10 12 10 6 10 12"
            stroke="#C1A57B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <h1 className="text-3xl font-bold text-[#f5f5f5] mt-8">Welcome!</h1>
        <p className="text-[#f5f5f5] text-center text-sm leading-relaxed">
          You’ve reached the right place. <br />
          Sit back, relax, and enjoy the experience.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
