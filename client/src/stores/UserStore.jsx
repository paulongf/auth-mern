import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserStoreContext = createContext();

export const useUserStore = () => useContext(UserStoreContext);

export const UserStoreProvider = ({ children, backendUrl }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all-users`, {
        withCredentials: true,
      });
      if (data.success) setUsers(data.users);
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("User deleted");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const updateRole = async (id, role) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/${id}/role`,
        { role },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: role } : u))
        );
      }
    } catch (error) {
      toast.error("Error updating user role");
    }
  };

  const value = {
    users,
    loading,
    fetchUsers,
    deleteUser,
    updateRole,
  };

  return (
    <UserStoreContext.Provider value={value}>
      {children}
    </UserStoreContext.Provider>
  );
};
