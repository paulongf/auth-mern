import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn, getUserData } = useContext(AppContent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const endpoint =
        state === "Sign Up" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        state === "Sign Up"
          ? form
          : { email: form.email, password: form.password };

      const { data } = await api.post(endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        await getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Unexpected error";
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-blue-300">
      <img
        onClick={() => navigate("/")}
        src={assets.custom_icon}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold mb-3 text-white text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="mb-6 text-center text-sm">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700 transition-colors">
              <img src={assets.person_icon} alt="" className="opacity-80" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent outline-none text-indigo-100 placeholder-indigo-200/60 w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700 transition-colors">
            <img src={assets.mail_icon} alt="" className="opacity-80" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none text-indigo-100 placeholder-indigo-200/60 w-full"
              type="email"
              placeholder="E-mail Address"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700 transition-colors">
            <img src={assets.lock_icon} alt="" className="opacity-80" />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none text-indigo-100 placeholder-indigo-200/60 w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-300 cursor-pointer"
          >
            Forgot password?
          </p>

          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-full text-white font-medium transition-opacity
              bg-gradient-to-r from-indigo-400 to-indigo-900
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-center text-gray-400 text-md mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-400 text-md mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
