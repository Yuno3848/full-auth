import React from "react";
import { useState } from "react";
import useSign from "../../hooks/useSignup";

const SignUp = () => {
  const { loading, signup } = useSign();
  const [inputs, setInputs] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
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

        <h2 className="text-3xl font-bold text-[#f5f5f5] mt-8">Sign Up</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">Full Name</label>
            <input
              type="text"
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value });
              }}
              placeholder="Enter your full name"
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">User Name</label>
            <input
              type="text"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
              placeholder="Choose a username"
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">Password</label>
            <input
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              placeholder="Create a password"
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setInputs({ ...inputs, avatar: e.target.files[0] })
              }
              className="bg-[#2a1d1d] text-white file:bg-[#C1A57B] file:text-[#1e1e1e] file:rounded-lg file:px-4 file:py-2 file:border-none file:cursor-pointer px-4 py-2 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#C1A57B] text-[#1e1e1e] font-semibold py-3 rounded-xl hover:bg-[#e2c89e] transition-all duration-300 hover:cursor-grab"
            disabled={loading}
          >
            {loading ? <span>Signing Up....</span> : <span>Sign up</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
