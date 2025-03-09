// components/HeroSection.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faChevronRight,
  faMicrophoneAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

export default function HeroSection() {
  return (
    <section className="bg-[#23292f] text-white pl-40 pr-40">
      <div className="container mx-auto px-4 py-8">
        {/* Top row: big image on left, stories on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left (Big Image) */}
          <div className="lg:col-span-2">
            <img 
              src="test.jpg" 
              alt="Hero" 
              className="w-full object-cover"
            />
          </div>

          {/* Right (Main story + Additional stories) */}
          <div className="space-y-4">
            {/* Main Story */}
            <div className="bg-[#23292f] border-l-4 border-[#ca0905] p-4">
              {/* Date + Icon */}
              <p className="text-gray-400 text-xs mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 03, 2021</span>
              </p>
              <h3 className="text-[#ca0905] text-lg font-bold mb-2">
                Merck CEO Kenneth Frazier To Retire At The End Of June
              </h3>
              <p className="text-sm text-gray-300">
                A short description or excerpt about the article...
              </p>
            </div>

            {/* Additional Stories */}
            <div className="bg-[#23292f] border-t border-gray-700 p-4">
              <p className="text-gray-400 text-xs mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 02, 2021</span>
              </p>
              <h4 className="text-white text-sm font-semibold">
                Journalist Calls Van Jones: An Opportunist For Praising And Defending MAGA...
              </h4>
            </div>
            <div className="bg-[#23292f] border-t border-gray-700 p-4">
              <p className="text-gray-400 text-xs mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                <span>Feb 01, 2021</span>
              </p>
              <h4 className="text-white text-sm font-semibold">
                Another Headline Goes Here...
              </h4>
            </div>
          </div>
        </div>

        {/* Podcast Section */}
        <div className="mt-8">
          {/* Heading row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold uppercase flex items-center space-x-2">
              {/* Microphone icon next to "I Podcast" */}
              <FontAwesomeIcon icon={faMicrophoneAlt} className="text-[#ca0905]" />
              <span>I Podcast</span>
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-[#ca0905] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </div>

          {/* Podcast items (4-column grid on md+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Podcast card #1 */}
            <div className="bg-white text-black p-4">
              <img 
                src="test.jpg" 
                alt="Podcast 1" 
                className="w-full mb-2"
              />
              <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faPlay} className="text-gray-500" />
                <span>Episode 71</span>
              </p>
              <h3 className="text-sm font-semibold mb-1">
                The Multi-Factor Revelation and the Sneaky Democrats
              </h3>
            </div>

            {/* Podcast card #2 */}
            <div className="bg-white text-black p-4">
              <img 
                src="test.jpg" 
                alt="Podcast 2" 
                className="w-full mb-2"
              />
              <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faPlay} className="text-gray-500" />
                <span>Episode 72</span>
              </p>
              <h3 className="text-sm font-semibold mb-1">
                J. Edgar Hoover and the Rat Psychology Guiding Politics: Part 1
              </h3>
            </div>

            {/* Podcast card #3 */}
            <div className="bg-white text-black p-4">
              <img 
                src="test.jpg" 
                alt="Podcast 3" 
                className="w-full mb-2"
              />
              <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faPlay} className="text-gray-500" />
                <span>Episode 73</span>
              </p>
              <h3 className="text-sm font-semibold mb-1">
                J. Edgar Hoover and the Rat Psychology Guiding Politics: Part 2
              </h3>
            </div>

            {/* Podcast card #4 */}
            <div className="bg-white text-black p-4">
              <img 
                src="test.jpg" 
                alt="Podcast 4" 
                className="w-full mb-2"
              />
              <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faPlay} className="text-gray-500" />
                <span>Episode 74</span>
              </p>
              <h3 className="text-sm font-semibold mb-1">
                Another Episode Title Here
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
