import React from "react";
import { Navbar } from "../";

function Achievements() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-blue-50 h-screen">
        <div className="container mx-auto text-center px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-700 mt-8">
            🎉 Our Achievements 🎉
          </h2>

          {/* Achievements Overview Section */}
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Blue Bells Engineering College, we're proud of the incredible
            achievements of our students and faculty. Our commitment to
            excellence in academics, sports, and community activities has led us
            to receive many awards and recognitions. Here's a glimpse of what
            makes us shine!
          </p>
        </div>

        {/* Achievements List Section */}
        <div className="container mx-auto mt-16 px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Achievement Card */}
            {[
              {
                emoji: "🎓",
                title: "Academic Excellence",
                description:
                  "Our students achieve top scores in exams and maintain high academic standards, thanks to our well-rounded programs.",
              },
              {
                emoji: "🏅",
                title: "Sporting Excellence",
                description:
                  "We've won numerous championships, fostering sportsmanship, teamwork, and physical fitness among our students.",
              },
              {
                emoji: "🎭",
                title: "Extracurricular Excellence",
                description:
                  "Our students shine in arts, dance, drama, and more, winning awards at national cultural events and festivals.",
              },
              {
                emoji: "👨‍🏫",
                title: "Faculty Excellence",
                description:
                  "Our faculty are dedicated to innovative teaching, with many receiving prestigious awards for their contributions.",
              },
              {
                emoji: "🌍",
                title: "Leadership & Community Service",
                description:
                  "Our students lead community initiatives and social projects that make a real difference in society.",
              },
              {
                emoji: "💡",
                title: "Innovation & Research",
                description:
                  "We encourage curiosity and creativity, with students excelling in research and presenting at global conferences.",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  {achievement.emoji} {achievement.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Achievements;
