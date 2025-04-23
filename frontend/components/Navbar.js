// components/Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {
  // Navigation items data
  const navItems = [
    { name: "Economy & Outlook", href: "/category/economyOutlook" },
    { name: "Stocks", href: "/category/stocks" },
    { name: "Cryptocurrencies", href: "/category/cryptocurrencies" },
    { name: "Forex", href: "/category/forex" },
    { name: "Commodities", href: "/category/commodities" },
  ];

  return (
    <nav className="bg-[#23292f] text-white pt-3 pr-3 pl-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left side: Brand + Nav links */}
        <div className="flex items-center space-x-8">
          {/* Brand in red box */}
          <Link href="/">
            <div className="bg-[#ca0905] px-4 py-2 text-white font-bold text-xl uppercase tracking-wide cursor-pointer">
              FinFo
            </div>
          </Link>

          {/* Nav links */}
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <li key={index} className="hover:text-[#ca0905] cursor-pointer">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Search icon + Subscribe button */}
        <div className="flex items-center space-x-4">
          {/* Search icon using Font Awesome */}
          {/* <button className="hidden md:block">
            <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
          </button> */}

          {/* Subscribe button */}
          <Link href="/subscribe">
            <button className="border border-white px-4 py-1 text-sm font-medium hover:bg-[#ca0905] hover:border-[#ca0905] transition-colors duration-200">
              SUBSCRIBE
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
