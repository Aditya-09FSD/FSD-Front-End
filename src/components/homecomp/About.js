import React from "react";
import { Navbar } from "../";

function About() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-900 mt-8">
            About Blue Bells Engineering College
          </h2>

          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Blue Bells Engineering College, located in Sector 10, Gurugram, is
            renowned for its commitment to excellence in education and holistic
            development. With a focus on nurturing young minds, we strive to
            empower students to reach their full potential academically,
            personally, and socially. Our dedicated faculty, well-equipped
            facilities, and a strong emphasis on values help our students excel
            in all areas of life.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="container mx-auto mt-16 px-4 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-semibold text-blue-800">
              Our Vision & Mission
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card with Light Gradient */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800">Our Vision</h4>
              <p className="mt-4 text-gray-800 leading-relaxed">
                To cultivate a community of learners who are confident,
                creative, and compassionate. Blue Bells Engineering College
                envisions producing global citizens equipped with the skills and
                values necessary to thrive in an ever-evolving world.
              </p>
            </div>
            {/* Mission Card with Light Gradient */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-400 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800">Our Mission</h4>
              <p className="mt-4 text-gray-800 leading-relaxed">
                To provide an educational environment that fosters academic
                excellence, instills a passion for learning, and encourages
                personal responsibility and respect for others. We aim to guide
                students towards becoming empathetic, socially responsible
                individuals who are ready to take on the challenges of the
                future.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="container mx-auto mt-16 px-4 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-semibold text-blue-800">
              Our Facilities
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Modern Classrooms with Light Gradient */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800">
                Modern Classrooms
              </h4>
              <p className="mt-4 text-gray-800 leading-relaxed">
                Equipped with state-of-the-art technology, our classrooms
                support dynamic and interactive learning experiences, providing
                a comfortable and engaging environment for students to excel.
              </p>
            </div>
            {/* Library & Laboratories with Light Gradient */}
            <div className="bg-gradient-to-r from-gray-150 to-gray-300 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800">
                Library & Laboratories
              </h4>
              <p className="mt-4 text-gray-800 leading-relaxed">
                Our well-stocked library and advanced science, computer, and
                language labs foster curiosity and research-based learning,
                helping students develop critical thinking and problem-solving
                skills.
              </p>
            </div>
            {/* Sports & Recreation with Light Gradient */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-400 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800">
                Sports & Recreation
              </h4>
              <p className="mt-4 text-gray-800 leading-relaxed">
                Blue Bells offers extensive sports facilities, including fields,
                courts, and a swimming pool, encouraging physical fitness, team
                spirit, and overall well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
