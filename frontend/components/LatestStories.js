// components/LatestStories.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function LatestStories() {
  // Stories data
  const stories = [
    {
      id: 1,
      date: "Feb 04, 2021",
      title:
        "Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America",
      image: "test.jpg",
      url:"/dynamicSlug",
    },
    {
      id: 2,
      date: "Feb 03, 2021",
      title:
        '"Black Caesar": Is The Famous Swashmailer Willie Lynch Speech Fake And A Hoax?',
      image: "test.jpg",
      url:"/dynamicSlug",
    },
    {
      id: 3,
      date: "Feb 02, 2021",
      title:
        "Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America",
      image: "test.jpg",
      url:"/dynamicSlug",
    },
    {
      id: 4,
      date: "Feb 01, 2021",
      title:
        '"Black Caesar": Is The Famous Swashmailer Willie Lynch Speech Fake And A Hoax?',
      image: "test.jpg",
      url:"/dynamicSlug",
    },
    {
      id: 5,
      date: "Jan 31, 2021",
      title:
        "Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America",
      image: "test.jpg",
      url:"/dynamicSlug",
    },
    {
      id: 6,
      date: "Jan 30, 2021",
      title:
        "Doctor: New Covid Mutations And Variants Pose Elevated Risks For Black America",
      image: "test.jpg",
      url:"/dynamicSlug",
    },
  ];

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold uppercase mb-6">Latest Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="space-y-2">
            {/* Clickable Image */}
            <a href={story.url} className="block">
              <img
                src={story.image}
                alt={`Story: ${story.title}`}
                className="w-full object-cover hover:opacity-90 transition-opacity"
              />
            </a>

            {/* Date */}
            <p className="text-xs text-gray-500 flex items-center space-x-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
              <span>{story.date}</span>
            </p>

            {/* Clickable Title */}
            <a
              href={story.url}
              className="text-sm font-semibold text-[#23292f] hover:text-[#ca0905] transition-colors block"
            >
              {story.title}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
