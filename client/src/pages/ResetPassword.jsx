import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = React.useRef([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message + " Error in Reset Password Page");
    }
  };

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
        {/* Reset Password Email Form */}
        {!isEmailSent && (
          <div>
            <h2 className="text-3xl font-semibold mb-3 text-white text-center">
              Reset Password
            </h2>
            <p className="mb-6 text-center text-sm text-indigo-300">
              Enter your registered email address to receive a password reset
              OTP.
            </p>

            <form onSubmit={onSubmitEmail}>
              <div
                className="mb-4 flex items-center gap-3 w-full
            px-5 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700
            transition-colors"
              >
                <img
                  src={assets.mail_icon}
                  alt="Mail Icon"
                  className="opacity-80"
                />
                <input
                  type="email"
                  placeholder="E-mail Address"
                  required
                  className="bg-transparent outline-none text-indigo-100
              placeholder-indigo-200/60 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gradient-to-r
            from-indigo-400 to-indigo-900 text-white font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* OTP Form */}
        {!isOtpSubmitted && isEmailSent && (
          <div>
            <form onSubmit={onSubmitOtp}>
              <h2 className="text-3xl font-semibold mb-3 text-white text-center">
                Reset Password OTP
              </h2>
              <p className="mb-6 text-center text-sm text-indigo-300">
                Enter the 6-digit OTP sent to your email
              </p>

              <div
                className="mb-4 flex justify-between gap-2"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="flex-1 min-w-[40px] h-12 bg-slate-600 hover:bg-slate-700
              text-indigo-100 text-center text-xl rounded-md outline-none"
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>

              <button
                className="w-full py-2.5 rounded-full bg-gradient-to-r
        from-indigo-400 to-indigo-900 text-white font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {/* New Password Form */}
        {isOtpSubmitted && isEmailSent && (
          <div>
            <h2 className="text-3xl font-semibold mb-3 text-white text-center">
              New password
            </h2>
            <p className="mb-6 text-center text-sm text-indigo-300">
              Enter your new password.
            </p>

            <form onSubmit={onSubmitNewPassword}>
              <div
                className="mb-4 flex items-center gap-3 w-full
        px-5 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700"
              >
                <img
                  src={assets.lock_icon}
                  alt="Lock Icon"
                  className="opacity-80"
                />
                <input
                  type="password"
                  className="bg-transparent outline-none text-indigo-100 w-full"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full py-2.5 rounded-full bg-gradient-to-r
        from-indigo-400 to-indigo-900 text-white font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
