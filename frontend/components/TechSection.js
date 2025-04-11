// components/TechSection.js
import React, { useState, useEffect } from "react";
import { getFinfotableByCategory } from "@/api.service";

export default function TechSection() {
  const [techStories, setTechStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechStories = async () => {
      try {
        const encodedCategory = encodeURIComponent("Economy & Outlook");
        const response = await getFinfotableByCategory(encodedCategory, 1, 6);

        if (response?.data) {
          setTechStories(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStories();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading)
    return <div className="py-8 text-center">Loading tech stories...</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ca0905] w-1 h-4"></div>
          <h2 className="text-xl font-bold uppercase text-[#23292f]">Tech</h2>
        </div>

        <a
          href="/category/Tech"
          className="text-sm uppercase text-[#ca0905] font-bold hover:underline flex items-center"
        >
          View All +
        </a>
      </div>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techStories.map((article) => {
          const formattedDate = formatDate(article.created_at);

          return (
            <a
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex items-center space-x-4 group hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                <img
                  src={article.banner_link}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 mb-1">
                  {formattedDate}
                </p>
                <h3 className="text-sm font-semibold text-[#23292f] leading-tight group-hover:text-[#ca0905] transition-colors line-clamp-3">
                  {article.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
