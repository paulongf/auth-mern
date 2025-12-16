import { Link } from "react-router-dom";

const UserListAccess = () => {
  return (
    <div className="mt-6">
      <Link
        to="/users"
        className="border border-gray-500 rounded-full px-8 py-2.5
      hover:bg-gray-100 transition-all"
      >
        Users Manager
      </Link>
    </div>
  );
};

export default UserListAccess;
