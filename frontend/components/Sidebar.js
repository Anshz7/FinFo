// components/Sidebar.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export default function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Markets / Crypto Tabs */}
      <div>
        <div className="flex">
          <button className="flex-1 bg-[#ca0905] text-white text-center py-2 font-bold uppercase">
            Markets
          </button>
          <button className="flex-1 bg-[#23292f] text-white text-center py-2 font-bold uppercase">
            Crypto
          </button>
        </div>

        {/* List of news items (Markets or Crypto) */}
        <div className="p-4 border border-gray-200">
          {/* Item #1 */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="test.jpg"
              alt="thumb"
              className="w-16 h-16 object-cover"
            />
            <div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 03, 2021</span>
              </p>
              <h4 className="text-sm font-semibold text-[#23292f]">
                How Retail Investors Shape Side Markets
              </h4>
            </div>
          </div>

          {/* Item #2 */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="test.jpg"
              alt="thumb"
              className="w-16 h-16 object-cover"
            />
            <div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 02, 2021</span>
              </p>
              <h4 className="text-sm font-semibold text-[#23292f]">
                Gold And Commodity As A Hedge
              </h4>
            </div>
          </div>

          {/* Item #3 */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="test.jpg"
              alt="thumb"
              className="w-16 h-16 object-cover"
            />
            <div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 01, 2021</span>
              </p>
              <h4 className="text-sm font-semibold text-[#23292f]">
                Silver Squeeze Gains Momentum
              </h4>
            </div>
          </div>

          {/* "More" link at the bottom */}
          <div>
            <a
              href="#"
              className="text-sm font-semibold text-[#ca0905] hover:underline"
            >
              MORE MARKETS NEWS &gt;&gt;
            </a>
          </div>
        </div>
      </div>

      {/* Subscribe Box in Red */}
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
        <button className="w-full bg-[#23292f] py-2 font-semibold text-white mb-4">
          Subscribe
        </button>

        {/* Social Icons (Font Awesome Brands) */}
        <div className="flex space-x-4 text-xl">
          <a href="#">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </aside>
  )
}
