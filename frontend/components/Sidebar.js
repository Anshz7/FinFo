// components/Sidebar.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { getFinfotableByCategory, subscribe } from "@/api.service";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("crypto");
  const [forexData, setForexData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", content: "Please enter an email address" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await subscribe(email);

      if (response.message === "Confirmation email sent") {
        setMessage({
          type: "success",
          content: "Confirmation email sent! Please check your inbox.",
        });
      } else if (response.message === "Confirmation email resent") {
        setMessage({
          type: "info",
          content: "Confirmation email resent. Check your inbox again.",
        });
      } else if (response.message === "Already subscribed") {
        setMessage({
          type: "info",
          content: "You're already subscribed!",
        });
      }

      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        content: error.message || "Subscription failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch forex news
        const forexResponse = await getFinfotableByCategory(
          encodeURIComponent("Forex"),
          1,
          3
        );

        // Fetch crypto news
        const cryptoResponse = await getFinfotableByCategory(
          encodeURIComponent("Cryptocurrencies"),
          1,
          3
        );

        if (forexResponse?.data) setForexData(forexResponse.data);
        if (cryptoResponse?.data) setCryptoData(cryptoResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const socialLinks = [
    {
      icon: faFacebookF,
      url: "https://www.facebook.com/people/Finfo-Guruji/pfbid02vU2ArM6veMaMPzqLyjVFYFwNCx5AmVcn8VBJz9JFsySkccgKJiGCKZ3e2DSdVKEhl/",
    },
    { icon: faTwitter, url: "https://x.com/finfoguruji" },
    { icon: faInstagram, url: "https://www.instagram.com/finfo_guru/" },
    { icon: faYoutube, url: "https://www.youtube.com/@finfo-Guruji" },
  ];

  if (loading) return <div className="text-center p-4">Loading news...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <aside className="space-y-8">
      {/* Forexs / Crypto Tabs */}
      <div>
        <div className="flex">
          {["crypto", "forex"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-2 font-bold uppercase transition-colors ${
                activeTab === tab
                  ? "bg-[#ca0905] text-white"
                  : "bg-[#23292f] text-white hover:bg-gray-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* News Items */}
        <div className="p-4 border border-gray-200">
          {(activeTab === "crypto" ? cryptoData : forexData).map((article) => {
            const formattedDate = formatDate(article.created_at);

            return (
              <a
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex items-center space-x-3 mb-4 group hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <img
                  src={article.banner_link}
                  alt={article.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="text-xs text-gray-500 flex items-center space-x-1">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-gray-400"
                    />
                    <span>{formattedDate}</span>
                  </p>
                  <h4 className="text-sm font-semibold text-[#23292f] group-hover:text-[#ca0905] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </a>
            );
          })}

          {/* More Link */}
          <div className="mt-4">
            <a
              href={`/category/${
                activeTab === "crypto" ? "cryptocurrencies" : "forex"
              }`}
              className="text-sm font-semibold text-[#ca0905] hover:underline"
            >
              MORE {activeTab.toUpperCase()} NEWS &gt;&gt;
            </a>
          </div>
        </div>
      </div>

      {/* Subscribe Box */}
      <div className="bg-[#ca0905] p-6 text-white">
        <h3 className="text-base font-bold uppercase mb-2">
          Stay up to date with the latest news
        </h3>
        <p className="text-sm mb-4">Politics, finance, and more...</p>

        <form onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-2 mb-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#23292f] py-2 font-semibold text-white mb-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Subscribe"}
          </button>
        </form>

        {/* Status Messages */}
        {message.content && (
          <div
            className={`text-sm p-2 rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {message.content}
          </div>
        )}

        {/* Social Icons */}
        <div className="flex space-x-4 text-xl">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="hover:text-[#23292f] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
