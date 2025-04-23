// pages/subscribe.js
import React, { useState } from "react";
import { subscribe } from "@/api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function SubscribePage() {
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

  const socialLinks = [
    {
      icon: faFacebookF,
      url: "https://www.facebook.com/people/Finfo-Guruji/pfbid02vU2ArM6veMaMPzqLyjVFYFwNCx5AmVcn8VBJz9JFsySkccgKJiGCKZ3e2DSdVKEhl/",
    },
    { icon: faTwitter, url: "https://x.com/finfoguruji" },
    { icon: faInstagram, url: "https://www.instagram.com/finfo_guru/" },
    { icon: faYoutube, url: "https://www.youtube.com/@finfo-Guruji" },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#23292f] overflow-hidden text-white">

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f24] to-[#23292f] z-0"></div>

      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#ca0905] opacity-20 rounded-full filter blur-[120px]"></div>
      <div className="absolute top-[60%] left-[80%] w-[300px] h-[300px] bg-[#ca0905] opacity-10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ca0905] opacity-10 rounded-full filter blur-[160px]"></div>

      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Centered Form Content */}
      <div className="relative z-10 max-w-md w-full bg-[#ca0905] p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-90">
        <h1 className="text-2xl font-bold uppercase mb-2 text-center">
          Subscribe to Our Newsletter
        </h1>
        <p className="text-sm text-center mb-4">
          Stay updated with the latest in politics, finance & more.
        </p>

        <form onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-2 mb-2 text-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#23292f] py-2 font-semibold text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Subscribe"}
          </button>
        </form>

        {message.content && (
          <div
            className={`text-sm p-2 mt-3 rounded text-center ${
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

        <div className="mt-6 flex justify-center space-x-4 text-xl">
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
    </div>
  );
}
