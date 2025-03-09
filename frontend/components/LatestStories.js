// components/LatestStories.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

export default function LatestStories() {
  return (
    <section className="py-8">
      {/* Section heading */}
      <h2 className="text-2xl font-bold uppercase mb-6">Latest Stories</h2>

      {/* 2 columns on md+, total 6 stories (3 rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Story #1 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 1"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Feb 04, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America
          </h3>
        </div>

        {/* Story #2 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 2"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Feb 03, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            "Black Caesar": Is The Famous Swashmailer Willie Lynch Speech Fake And A Hoax?
          </h3>
        </div>

        {/* Story #3 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 3"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Feb 02, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America
          </h3>
        </div>

        {/* Story #4 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 4"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Feb 01, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            "Black Caesar": Is The Famous Swashmailer Willie Lynch Speech Fake And A Hoax?
          </h3>
        </div>

        {/* Story #5 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 5"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Jan 31, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America
          </h3>
        </div>

        {/* Story #6 */}
        <div className="space-y-2">
          <img
            src="test.jpg"
            alt="Story 6"
            className="w-full object-cover"
          />
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
            <span>Jan 30, 2021</span>
          </p>
          <h3 className="text-sm font-semibold text-[#23292f]">
            Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America
          </h3>
        </div>
      </div>
    </section>
  )
}
