import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { searchFinfotable } from "@/api.service";

export default function Navbar() {
  const navItems = [
    { name: "Economy & Outlook", href: "/category/economyOutlook" },
    { name: "Stocks", href: "/category/stocks" },
    { name: "Cryptocurrencies", href: "/category/cryptocurrencies" },
    { name: "Forex", href: "/category/forex" },
    { name: "Commodities", href: "/category/commodities" },
  ];

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const handler = setTimeout(async () => {
      const data = await searchFinfotable(searchTerm.trim());
      setResults(data || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug) => {
    setSearchTerm("");
    setResults([]);
    router.push(`/article/${slug}`);
  };

  return (
    <nav className="bg-[#23292f] text-white pt-3 px-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Brand & Nav Links */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <div className="bg-[#ca0905] px-4 py-2 text-white font-bold text-xl uppercase tracking-wide cursor-pointer">
              FinFo
            </div>
          </Link>
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, idx) => (
              <li key={idx} className="hover:text-[#ca0905] cursor-pointer">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Subscribe */}
        <div className="relative flex items-center space-x-4" ref={containerRef}>
          <div className="hidden md:block">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-96 bg-white text-black rounded-full pl-10 pr-4 py-1 focus:outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Dropdown */}
              {(results.length > 0 || loading) && (
                <ul className="absolute mt-2 w-full bg-white text-black rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                  {loading && (
                    <li className="px-4 py-2 text-gray-500">Loading...</li>
                  )}
                  {!loading && results.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(item.slug)}
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                        <img
                          src={item.banner_link}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="ml-3 truncate font-medium">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

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
