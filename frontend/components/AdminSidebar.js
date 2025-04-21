import React from "react";
import { useRouter } from "next/router";

const AdminSidebar = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg flex flex-col justify-between">
      {/* Admin Panel Title */}
      <div>
        <div className="p-6 text-2xl font-bold">Admin Panel</div>
        <ul className="space-y-4 p-6">
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              onClick={() => router.push("/admin/dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              onClick={() => router.push("/admin/edit")}
            >
              Edit
            </button>
          </li>
        </ul>
      </div>

      {/* User Logo Section */}
      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src="/user-logo.png" // Replace with the actual path to your user logo
            alt="User Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;