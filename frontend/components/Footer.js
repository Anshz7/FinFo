// components/Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#23292f] text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Top Row: Brand, Nav Links, Subscribe */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
          {/* Brand (Red Box) */}
          <Link href="/">
            <div className="bg-[#ca0905] px-4 py-2 text-white font-bold text-xl uppercase tracking-wide cursor-pointer">
              FinFo
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6 mt-4 lg:mt-0">
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              <a href="/about-us" target="_blank">
                About
              </a>
            </li>
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              <a href="/contact" target="_blank">
                Contact
              </a>
            </li>
            <li className="text-sm hover:text-[#ca0905] cursor-pointer uppercase">
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
            </li>
          </ul>

          {/* Subscribe button */}
          <Link href="/subscribe">
            <button className="border border-white px-4 py-1 text-sm font-medium hover:bg-[#ca0905] hover:border-[#ca0905] transition-colors duration-200">
              SUBSCRIBE
            </button>
          </Link>
        </div>

        {/* Bottom Row: Copyright & Social */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">
            © 2021 FinFo, All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2 lg:mt-0 text-xl">
            <a
              href="https://www.facebook.com/people/Finfo-Guruji/pfbid02vU2ArM6veMaMPzqLyjVFYFwNCx5AmVcn8VBJz9JFsySkccgKJiGCKZ3e2DSdVKEhl/"
              aria-label="Facebook"
              className="hover:text-[#ca0905]"
              target="_blank"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://x.com/finfoguruji"
              aria-label="Twitter"
              className="hover:text-[#ca0905]"
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com/finfo_guru/"
              aria-label="Instagram"
              className="hover:text-[#ca0905]"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.youtube.com/@finfo-Guruji"
              aria-label="YouTube"
              className="hover:text-[#ca0905]"
              target="_blank"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
