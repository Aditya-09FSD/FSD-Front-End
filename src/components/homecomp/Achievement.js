import React from "react";
import { Navbar } from "../";

function Achievements() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-900 mt-8">
            Our Achievements
          </h2>

          {/* Achievements Overview Section */}
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At Blue Bells Public School, we take pride in the remarkable
            achievements of our students and faculty. Our dedication to academic
            excellence, sports, extracurricular activities, and overall student
            development has earned us numerous accolades and honors over the
            years. Below are some of the notable milestones we have achieved as
            a school community.
          </p>
        </div>

        {/* Achievements List Section */}
        <div className="container mx-auto mt-16 px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Academic Achievement */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                🎓 Academic Excellence
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Blue Bells consistently ranks among the top schools in the
                region, with students achieving outstanding results in national
                and international exams. Our academic programs are designed to
                provide a well-rounded, rigorous education.
              </p>
            </div>

            {/* Sports Achievement */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                🏅 Sporting Excellence
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our students have excelled in various sports, including
                athletics, football, and swimming. We have won several regional
                and national championships. Blue Bells fosters sportsmanship,
                teamwork, and physical fitness.
              </p>
            </div>

            {/* Extracurricular Achievements */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                🎭 Extracurricular Excellence
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our students shine in a variety of extracurricular activities
                such as music, dance, drama, and public speaking. We have won
                awards in national arts festivals and cultural events.
              </p>
            </div>

            {/* Faculty Recognition */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                👨‍🏫 Faculty Excellence
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our highly qualified and passionate faculty members have been
                recognized for their contributions to education. Many have
                received teaching excellence awards and recognitions for their
                innovative methods.
              </p>
            </div>

            {/* Leadership & Community Service */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                🌍 Leadership & Community Service
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our students are actively involved in community service
                initiatives and leadership programs. They have initiated
                successful social causes and projects that positively impact
                society.
              </p>
            </div>

            {/* Innovation & Research */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                💡 Innovation & Research
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Blue Bells fosters an environment of curiosity and creativity.
                Our students have been recognized in research competitions,
                innovation challenges, and have presented their findings at
                international conferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Achievements;
