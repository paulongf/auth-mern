import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleGuard from "./components/RoleGuard";
import UserListAccess from "./components/UsersListAccess";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/users"
          element={
            <RoleGuard allowedRoles={["ADMIN", "MANAGER"]}>
              <UsersPage />
            </RoleGuard>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
