"use client";
import { useState } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
//aman//
const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-40 md:pl-64">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Navbar Title */}
          <h1 className="italic text-lg font-semibold ">Admin Dashboard</h1>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300"
            >
              <User className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2">
                <Link href="/profile" className="block px-4 py-3 hover:bg-gray-100 flex items-center transition duration-300">
                  <User className="w-4 h-4 mr-2" /> Profile
                </Link>
                <Link href="/settings" className="block px-4 py-3 hover:bg-gray-100 flex items-center transition duration-300">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Link>
                <hr className="border-gray-200" />
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center transition duration-300">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
