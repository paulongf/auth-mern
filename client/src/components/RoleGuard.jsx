import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const RoleGuard = ({ allowedRoles, children }) => {
  const { isLoggedin, userData } = useContext(AppContent);

  if (!isLoggedin) return null;
  if (!userData) return null;

  if (!allowedRoles.includes(userData.role)) return null;

  return children;
};

export default RoleGuard;
