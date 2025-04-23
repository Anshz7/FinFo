import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";

const AdminSidebar = () => {
  const router = useRouter();
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#23292f] text-white shadow-lg flex flex-col justify-between">
      {/* Admin Panel Title */}
      <div>
        <div className="p-6 text-2xl font-bold">Admin Panel</div>
        <ul className="space-y-4 p-6">
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={() => router.push("/admin/dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={() => router.push("/admin/edit")}
            >
              Edit Content
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={() => router.push("/admin/contacts")}
            >
              Contact Messages
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex flex-col space-y-4">
          {admin && (
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                {admin.username.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium">{admin.username}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 rounded transition-colors duration-200 flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
