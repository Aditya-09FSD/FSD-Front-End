import React from "react";
import { Navbar } from "../";

function About() {
  return (
    <>
      <Navbar />
      <section className="py-20 bg-gradient-to-b from-blue-100 to-gray-200">
        {/* Header Section */}
        <div className="container mx-auto text-center px-6 lg:px-12">
          <h2 className="text-5xl font-extrabold text-blue-900 mt-10 tracking-tight drop-shadow-lg">
            About Blue Bells Engineering College
          </h2>

          <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
        <div className="container mx-auto mt-20 px-6 lg:px-12">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold text-blue-800 drop-shadow-lg">
              Our Vision & Mission
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card with Enhanced Gradient */}
            <div className="bg-gradient-to-br from-blue-100 via-white to-gray-100 shadow-2xl rounded-lg p-10 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-3xl font-bold text-blue-800 mb-4">
                Our Vision
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To cultivate a community of learners who are confident,
                creative, and compassionate. Blue Bells Engineering College
                envisions producing global citizens equipped with the skills and
                values necessary to thrive in an ever-evolving world.
              </p>
            </div>
            {/* Mission Card with Enhanced Gradient */}
            <div className="bg-gradient-to-br from-blue-100 via-white to-gray-100 shadow-2xl rounded-lg p-10 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-3xl font-bold text-blue-800 mb-4">
                Our Mission
              </h4>
              <p className="text-gray-600 leading-relaxed">
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
        <div className="container mx-auto mt-20 px-6 lg:px-12">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold text-blue-800 drop-shadow-lg">
              Our Facilities
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Modern Classrooms */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-gray-50 shadow-xl rounded-lg p-10 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800 mb-4">
                Modern Classrooms
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Equipped with state-of-the-art technology, our classrooms
                support dynamic and interactive learning experiences, providing
                a comfortable and engaging environment for students to excel.
              </p>
            </div>
            {/* Library & Laboratories */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-gray-50 shadow-xl rounded-lg p-10 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800 mb-4">
                Library & Laboratories
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our well-stocked library and advanced science, computer, and
                language labs foster curiosity and research-based learning,
                helping students develop critical thinking and problem-solving
                skills.
              </p>
            </div>
            {/* Sports & Recreation */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-gray-50 shadow-xl rounded-lg p-10 transform hover:scale-105 transition-all duration-500">
              <h4 className="text-2xl font-bold text-blue-800 mb-4">
                Sports & Recreation
              </h4>
              <p className="text-gray-600 leading-relaxed">
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
