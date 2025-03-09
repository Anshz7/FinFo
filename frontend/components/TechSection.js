// components/TechSection.js
import React from 'react'

export default function TechSection() {
  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left side: red bar + "TECH" */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#ca0905] w-1 h-4"></div>
          <h2 className="text-xl font-bold uppercase text-[#23292f]">Tech</h2>
        </div>

        {/* Right side: "VIEW ALL +" link */}
        <a
          href="#"
          className="text-sm uppercase text-[#ca0905] font-bold hover:underline flex items-center"
        >
          View All +
        </a>
      </div>

      {/* 3x2 Grid (6 items total) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Item #1 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 1"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>

        {/* Item #2 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 2"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>

        {/* Item #3 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 3"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>

        {/* Item #4 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 4"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>

        {/* Item #5 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 5"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>

        {/* Item #6 */}
        <div className="flex items-center space-x-4">
          <img
            src="test.jpg"
            alt="Tech Story 6"
            className="w-32 h-20 object-cover"
          />
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1">08 Feb 2021</p>
            <h3 className="text-sm font-semibold text-[#23292f] leading-tight">
              TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
