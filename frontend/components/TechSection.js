// components/TechSection.js
import React from 'react'

export default function TechSection() {
  // Tech stories data
  const techStories = [
    {
      id: 1,
      date: "08 Feb 2021",
      title: "TikTok Is Using Your Phone Number To Track You: How To Turn Off The Data-Stalker Setting",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 2,
      date: "07 Feb 2021",
      title: "New AI Algorithm Predicts Stock Market Trends With 90% Accuracy",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 3,
      date: "06 Feb 2021",
      title: "Quantum Computing Breakthrough: Major Advancement in Qubit Stability",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 4,
      date: "05 Feb 2021",
      title: "Meta's New VR Headset Raises Privacy Concerns Among Users",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 5,
      date: "04 Feb 2021",
      title: "Open Source Alternative to ChatGPT Gains Traction Among Developers",
      image: "test.jpg",
      url: "/dynamicSlug"
    },
    {
      id: 6,
      date: "03 Feb 2021",
      title: "New EU Regulations Force Tech Giants to Rethink Data Collection",
      image: "test.jpg",
      url: "/dynamicSlug"
    }
  ]

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ca0905] w-1 h-4"></div>
          <h2 className="text-xl font-bold uppercase text-[#23292f]">Tech</h2>
        </div>

        <a
          href="/tech"
          className="text-sm uppercase text-[#ca0905] font-bold hover:underline flex items-center"
        >
          View All +
        </a>
      </div>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techStories.map((story) => (
          <a 
            key={story.id} 
            href={story.url}
            className="flex items-center space-x-4 group hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-32 h-20 object-cover"
            />
            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-1">
                {story.date}
              </p>
              <h3 className="text-sm font-semibold text-[#23292f] leading-tight group-hover:text-[#ca0905] transition-colors">
                {story.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}