import { useEffect, useContext } from "react";
import { useUserStore } from "../stores/UserStore";
import { AppContent } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const { userData } = useContext(AppContent);
  const { users, loading, fetchUsers, deleteUser, updateRole } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-indigo-200">Loading users...</p>
    );

  return (
    <div className="flex flex-col items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Top bar com logo, avatar e botão voltar */}
      <div className="w-full flex justify-between items-center py-5 px-6 sm:px-20">
        <img
          src={assets.custom_icon}
          alt="Logo"
          className="w-28 sm:w-32 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-4">
          {userData?.avatar && (
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-400"
            />
          )}
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-500 rounded-full px-8 py-2.5
      hover:bg-gray-100 transition-all"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-5xl text-indigo-100">
        <h1 className="text-3xl font-semibold mb-6 text-white text-center">
          Users Management
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-800 text-indigo-100">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                {userData?.role === "ADMIN" && (
                  <th className="text-center p-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {userData?.role === "ADMIN" ? (
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user._id, e.target.value)}
                        className="bg-gray-600 text-indigo-100 px-2 py-1 rounded"
                      >
                        <option value="USER">USER</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-gray-600">
                        {user.role}
                      </span>
                    )}
                  </td>

                  {userData?.role === "ADMIN" && (
                    <td className="p-3 text-center flex justify-center gap-3">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-400 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-gray-400 mt-6">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
