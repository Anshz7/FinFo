import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { getFinfotableByCategory } from "@/api.service";

const languageOptions = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi | हिन्दी" },
  { code: "ta", name: "Tamil | தமிழ்" },
  { code: "mr", name: "Marathi | मराठी" },
  { code: "te", name: "Telugu | తెలుగు" },
  { code: "kn", name: "Kannada | ಕನ್ನಡ" },
  { code: "gu", name: "Gujarati | ગુજરાતી" },
  { code: "pa", name: "Punjabi | ਪੰਜਾਬੀ" },
  { code: "bn", name: "Bengali | বাংলা" },
  { code: "ml", name: "Malayalam | മലയാളം" },
  { code: "ur", name: "Urdu | اردو" },
];


export default function StockNewsPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState("en");
  const [pagination, setPagination] = useState({});

  const pageSize = 6; // Matching original component's 6 items

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getFinfotableByCategory(
          "Stocks",
          currentPage,
          pageSize,
          selectedLang
        );

        if (response?.data) {
          setStories(response.data);
          setPagination(response.pagination || {});
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, selectedLang]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Enhanced Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b-2 border-[#ca0905] pb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-[#23292f] mb-2">
              Stock Market Insights
            </h1>
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              Latest Updates & Market Analysis
            </p>
          </div>

          {/* Language Selector */}
          <div className="relative w-full md:w-56">
            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 
                        focus:border-[#ca0905] focus:outline-none hover:border-gray-400 transition-all
                        text-sm font-semibold"
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-4 top-4 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <a href={`/article/${story.slug}`} className="block relative">
                <img
                  src={story.banner_link}
                  alt={story.title}
                  className="w-full h-52 object-cover hover:opacity-90 transition-opacity"
                />
              </a>
              <div className="p-4">
                <p className="text-xs text-gray-500 flex items-center space-x-2 mb-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-[#ca0905]"
                  />
                  <span>{formatDate(story.created_at)}</span>
                </p>
                <a
                  href={`/article/${story.slug}`}
                  className="text-base font-semibold text-[#23292f] hover:text-[#ca0905] transition-colors block leading-tight"
                >
                  {story.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 
                     hover:border-[#ca0905] hover:text-[#ca0905] disabled:opacity-50 disabled:hover:border-gray-300
                     font-semibold text-sm"
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-[#23292f] mx-4">
            Page {currentPage} of {pagination.totalPages || 1}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (pagination.totalPages || 1)}
            className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 
                     hover:border-[#ca0905] hover:text-[#ca0905] disabled:opacity-50 disabled:hover:border-gray-300
                     font-semibold text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
