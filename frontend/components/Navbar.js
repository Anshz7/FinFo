// components/Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="bg-[#23292f] text-white pt-3 pr-3 pl-3 sticky top-0">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left side: Brand + Nav links */}
        <div className="flex items-center space-x-8">
          {/* Brand in red box */}
          <div className="bg-[#ca0905] px-4 py-2 text-white font-bold text-xl uppercase tracking-wide">
            FinFo
          </div>

          {/* Nav links */}
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <li className="hover:text-[#ca0905] cursor-pointer">Podcast</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Politics</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Tech</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Reparations</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Markets</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Gold</li>
            <li className="hover:text-[#ca0905] cursor-pointer">Crypto</li>
            <li className="hover:text-[#ca0905] cursor-pointer">More</li>
          </ul>
        </div>

        {/* Right side: Search icon + Subscribe button */}
        <div className="flex items-center space-x-4">
          {/* Search icon using Font Awesome */}
          <button className="hidden md:block">
            <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
          </button>

          {/* Subscribe button */}
          <button className="border border-white px-4 py-1 text-sm font-medium hover:bg-[#ca0905] hover:border-[#ca0905] transition-colors duration-200">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </nav>
  );
}
