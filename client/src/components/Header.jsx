import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import UserListAccess from "../components/UsersListAccess";
import RoleGuad from "../components/RoleGuard";

const Header = () => {
  const { userData } = useContext(AppContent);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center">
      <img
        src={assets.header_img}
        alt="Header"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1
        className="flex items-center gap-2 text-xl sm:text-3xl font-medium
      mb-2"
      >
        Hey {userData ? userData.name : "Developer"}
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>
      <h3>Role: {userData?.role || "Guest"}</h3>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className="mb-8 max-w-md">
        Let's build something amazing together! Explore our features and enjoy
        your stay.
      </p>
      <button
        className="border border-gray-500 rounded-full px-8 py-2.5
      hover:bg-gray-100 transition-all"
      >
        Get Started
      </button>
      <RoleGuad allowedRoles={["ADMIN", "MANAGER"]}>
        <UserListAccess />
      </RoleGuad>
    </div>
  );
};

export default Header;
