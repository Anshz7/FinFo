// components/Sidebar.js
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('markets')

  // News items data
  const marketNews = [
    {
      id: 1,
      date: "Feb 03, 2021",
      title: "How Retail Investors Shape Side Markets",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 2,
      date: "Feb 02, 2021",
      title: "Gold And Commodity As A Hedge",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 3,
      date: "Feb 01, 2021",
      title: "Silver Squeeze Gains Momentum",
      image: "test.jpg",
      url: "/dynamicSlug"
    }
  ]

  const cryptoNews = [
    {
      id: 1,
      date: "Feb 03, 2021",
      title: "Bitcoin Surpasses $50,000 Milestone",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 2,
      date: "Feb 02, 2021",
      title: "Ethereum 2.0 Upgrade Progress",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 3,
      date: "Feb 01, 2021",
      title: "NFT Market Continues to Boom",
      image: "test.jpg",
      url: "/dynamicSlug"
    }
  ]

  const socialLinks = [
    { icon: faFacebookF, url: "#" },
    { icon: faTwitter, url: "#" },
    { icon: faInstagram, url: "#" },
    { icon: faYoutube, url: "#" }
  ]

  return (
    <aside className="space-y-8">
      {/* Markets / Crypto Tabs */}
      <div>
        <div className="flex">
          {['markets', 'crypto'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-2 font-bold uppercase transition-colors ${
                activeTab === tab 
                  ? 'bg-[#ca0905] text-white' 
                  : 'bg-[#23292f] text-white hover:bg-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* News Items */}
        <div className="p-4 border border-gray-200">
          {(activeTab === 'markets' ? marketNews : cryptoNews).map((news) => (
            <a
              key={news.id}
              href={news.url}
              className="flex items-center space-x-3 mb-4 group hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-xs text-gray-500 flex items-center space-x-1">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                  <span>{news.date}</span>
                </p>
                <h4 className="text-sm font-semibold text-[#23292f] group-hover:text-[#ca0905] transition-colors">
                  {news.title}
                </h4>
              </div>
            </a>
          ))}

          {/* More Link */}
          <div className="mt-4">
            <a
              href={`/${activeTab}`}
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
        <p className="text-sm mb-4">
          Politics, finance, and more...
        </p>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full p-2 mb-2 text-black"
        />
        <button className="w-full bg-[#23292f] py-2 font-semibold text-white mb-4 hover:bg-gray-800 transition-colors">
          Subscribe
        </button>

        {/* Social Icons */}
        <div className="flex space-x-4 text-xl">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="hover:text-[#23292f] transition-colors"
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}