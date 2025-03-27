// components/HeroSection.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronRight,
  faMicrophoneAlt,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export default function HeroSection() {
  const [activeStory, setActiveStory] = useState(0);

  // Updated stories with a "url" property for navigation
  const stories = [
    {
      id: 0,
      date: "Feb 03, 2021",
      title: "Merck CEO Kenneth Frazier To Retire At The End Of June",
      description: "A short description or excerpt about the article...",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
    {
      id: 1,
      date: "Feb 02, 2021",
      title:
        "Journalist Calls Van Jones: An Opportunist For Praising And Defending MAGA...",
      description: "Analysis of recent political commentary...",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
    {
      id: 2,
      date: "Feb 01, 2021",
      title: "Breaking: Major Tech Innovation Unveiled",
      description: "Revolutionary new technology hits the market...",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
  ];

  const podcasts = [
    {
      episode: "Episode 71",
      title: "The Multi-Factor Revelation and the Sneaky Democrats",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
    {
      episode: "Episode 72",
      title: "J. Edgar Hoover and the Rat Psychology Guiding Politics: Part 1",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
    {
      episode: "Episode 73",
      title: "J. Edgar Hoover and the Rat Psychology Guiding Politics: Part 2",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
    {
      episode: "Episode 74",
      title: "Another Episode Title Here",
      image: "test.jpg",
      url: "/dynamicSlug",
    },
  ];

  return (
    <section className="bg-[#23292f] text-white pl-40 pr-40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left (Dynamic Big Image) */}
          <div className="lg:col-span-2">
            <a href={stories[activeStory].url}>
              <img
                src={stories[activeStory].image}
                alt="Hero"
                className="w-full h-full object-cover cursor-pointer"
              />
            </a>
          </div>

          {/* Right (Stories) */}
          <div className="space-y-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-[#23292f] p-4 border-t border-gray-700"
              >
                <p className="text-gray-400 text-xs mb-1 flex items-center space-x-1">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{story.date}</span>
                </p>
                <h3
                  onClick={() => setActiveStory(story.id)}
                  className={`cursor-pointer ${
                    activeStory === story.id
                      ? "text-[#ca0905] text-lg font-bold"
                      : "text-white text-sm font-semibold"
                  } mb-2`}
                >
                  {story.title}
                </h3>
                {activeStory === story.id && (
                  <div>
                    <p className="text-sm text-gray-300">{story.description}</p>
                    <a
                      href={story.url}
                      className="text-[#ca0905] underline text-sm mt-2 inline-block"
                    >
                      Learn more
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Podcast Section */}
        <div className="mt-8">
          {/* Heading row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold uppercase flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                className="text-[#ca0905]"
              />
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
            {podcasts.map((podcast, index) => (
              <div key={index} className="bg-white text-black p-4">
                <a
                  href={podcast.url}
                  className="block transition duration-300 ease-in-out"
                >
                  <img
                    src={podcast.image}
                    alt={`Podcast ${index + 1}`}
                    className="w-full mb-2 hover:brightness-105"
                  />
                </a>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <FontAwesomeIcon icon={faPlay} className="text-gray-500" />
                  <span>{podcast.episode}</span>
                </p>
                <a
                  href={podcast.url}
                  className="transition duration-300 ease-in-out hover:text-[#ca0905]"
                >
                  <h3 className="text-sm font-semibold mb-1">
                    {podcast.title}
                  </h3>
                </a>
              </div>
            ))}
          </div>
        </div>  
      </div>
    </section>
  );
}
