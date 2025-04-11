import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faChartLine } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center bg-red-600">
          <h2 className="italic text-xl font-serif">Admin Panel</h2>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded-md flex items-center space-x-3">
            <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded-md flex items-center space-x-3">
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            <span>Users</span>
          </a>
          <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded-md flex items-center space-x-3">
            <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 text-gray-800 bg-gray-200 p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    </div>
  );
};

export default AdminSidebar;
