import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const { token } = useParams();
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading, resetPassword } = useResetPassword({ token });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(inputs);
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

        <h2 className="text-3xl font-bold text-[#f5f5f5] mt-8">
          Reset Password
        </h2>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#f5f5f5] text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              className="bg-[#2a1d1d] text-white px-4 py-3 rounded-xl border border-[#4d3b3b] focus:outline-none focus:ring-2 focus:ring-[#C1A57B]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#C1A57B] text-[#1e1e1e] font-semibold py-3 rounded-xl hover:bg-[#e2c89e] transition-all duration-300 hover:cursor-pointer"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
