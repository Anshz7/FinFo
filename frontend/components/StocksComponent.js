// components/StockComponents.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getFinfotableByCategory } from "@/api.service";

export default function StockComponents() {
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedCategory = encodeURIComponent("Stocks");
        const response = await getFinfotableByCategory(encodedCategory, 1, 6);
        
        if (response?.data) {
          setStoriesData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold uppercase mb-6">Latest Stocks News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storiesData.map((story) => {
          const formattedDate = formatDate(story.created_at);
          
          return (
            <div key={story.id} className="space-y-2">
              <a href={`/article/${story.slug}`} className="block">
                <img
                  src={story.banner_link}
                  alt={story.title}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </a>

              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>{formattedDate}</span>
              </p>

              <a
                href={`/article/${story.slug}`}
                className="text-sm font-semibold text-[#23292f] hover:text-[#ca0905] transition-colors block"
              >
                {story.title}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}