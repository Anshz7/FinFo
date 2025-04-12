import React from "react";
import { useRouter } from "next/router";

const AdminSidebar = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold">Admin Panel</div>
      <ul className="space-y-4 p-6">
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => router.push("/admin/edit")}
          >
            Edit
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => router.push("/admin/dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;