// components/Footer.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-[#23292f] text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Top Row: Brand, Nav Links, Subscribe */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
          {/* Brand (Red Box) */}
          <div className="bg-[#ca0905] px-4 py-2 text-white font-bold text-xl uppercase tracking-wide">
            FinFo
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6 mt-4 lg:mt-0">
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              About
            </li>
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              Contact
            </li>
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              Privacy Policy
            </li>
          </ul>

          {/* Subscribe Button */}
          <button className="border border-white px-4 py-1 text-sm font-medium hover:bg-[#ca0905] hover:border-[#ca0905] transition-colors duration-200 mt-4 lg:mt-0 uppercase">
            Subscribe
          </button>
        </div>

        {/* Bottom Row: Copyright & Social */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">
            © 2021 FinFo, All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2 lg:mt-0 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-[#ca0905]">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#ca0905]">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#ca0905]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-[#ca0905]">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
