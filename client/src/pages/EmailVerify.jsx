import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message + " Error in Email Verify Page");
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.split("");
    pasteArray.forEach((char, index) => {
      if (index < inputRefs.current.length) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0
      bg-gradient-to-br from-blue-100 to-blue-300"
    >
      <img
        onClick={() => navigate("/")}
        src={assets.custom_icon}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold mb-3 text-white text-center">
          Email Verify OTP
        </h2>
        <p className="mb-6 text-center text-sm text-indigo-300">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={onSubmitHandler}>
          <div
            className="mb-4 flex justify-between gap-2"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  required
                  className="flex-1 min-w-[40px] h-12 bg-slate-600 hover:bg-slate-700
                   text-indigo-100 placeholder-indigo-200/60 text-center text-xl 
                   rounded-md outline-none transition-colors"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r
            from-indigo-400 to-indigo-900 text-white font-medium"
          >
            Verify OTP
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-gray-400 text-md mt-4 cursor-pointer underline"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
