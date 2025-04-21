// components/HeroSection.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronRight,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { getFinfotable, getFinfotableByCategory } from "@/api.service";

export default function HeroSection() {
  const [activeStory, setActiveStory] = useState(0);
  const [finfoData, setFinfoData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch main data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFinfotable(1, 3, "en");
        if (response?.data) {
          setFinfoData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const encodedCategory = encodeURIComponent("Economy & Outlook");
        const response = await getFinfotableByCategory(
          encodedCategory,
          1,
          4,
          "en"
        );
        if (response?.data) {
          setCategoryData(response.data);
        }
      } catch (err) {
        console.error("Error fetching category data:", err);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategoryData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Transform API data to story format
  const stories = finfoData.map((article) => ({
    id: article.id,
    date: formatDate(article.created_at),
    title: article.title,
    description: article.content.split(". ")[0] + ".",
    image: article.banner_link,
    url: `/article/${article.slug}`,
  }));

  // Transform category data to card format
  const categoryCards = categoryData.map((article) => ({
    id: article.id,
    date: formatDate(article.created_at),
    title: article.title,
    image: article.banner_link,
    url: `/article/${article.slug}`,
  }));

  return (
    <section className="bg-[#23292f] text-white pl-40 pr-40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left (Dynamic Big Image) */}
          <div className="lg:col-span-2 h-[500px]">
            {stories.length > 0 && (
              <a href={stories[activeStory].url} className="block h-full">
                <img
                  src={stories[activeStory].image}
                  alt="Hero"
                  className="w-full h-full object-cover cursor-pointer"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    minHeight: "500px",
                  }}
                />
              </a>
            )}
          </div>

          {/* Right (Stories) */}
          <div className="space-y-4">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="bg-[#23292f] p-4 border-t border-gray-700"
              >
                <p className="text-gray-400 text-xs mb-1 flex items-center space-x-1">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{story.date}</span>
                </p>
                <h3
                  onClick={() => setActiveStory(index)}
                  className={`cursor-pointer ${
                    activeStory === index
                      ? "text-[#ca0905] text-lg font-bold"
                      : "text-white text-sm font-semibold"
                  } mb-2`}
                >
                  {story.title}
                </h3>
                {activeStory === index && (
                  <div>
                    <p className="text-sm text-gray-300">{story.description}</p>
                    <a
                      href={story.url}
                      className="text-[#ca0905] underline text-sm mt-2 inline-block"
                    >
                      Learn more
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold uppercase flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faCoins}
                className="text-[#ca0905]"
              />
              <span>Economy & Outlook</span>
            </h2>
            <a
              href="/category/economyOutlook"
              className="text-sm font-medium text-[#ca0905] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categoryCards.map((card) => (
              <div key={card.id} className="bg-white text-black p-4">
                <a
                  href={card.url}
                  className="block transition duration-300 ease-in-out"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full mb-2 hover:brightness-105 object-cover h-48"
                  />
                </a>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-gray-500"
                  />
                  <span>{card.date}</span>
                </p>
                <a
                  href={card.url}
                  className="transition duration-300 ease-in-out hover:text-[#ca0905]"
                >
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                    {card.title}
                  </h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
