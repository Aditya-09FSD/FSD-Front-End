import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";

// Replace static image with dynamic import
const back = require("../../devdata/assets/image.png");

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${back})`, // Dynamically applying the background image
      }}
    >
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-2 text-center shadow-md animate-fadeIn">
        Blue Bells Engineering College
      </h1>
      <p className="text-xl text-gray-700 my-1 text-center animate-fadeInSlide">
        Nurturing Young Minds
      </p>
      <p className="text-xl text-gray-700 my-1 text-center animate-fadeInSlide">
        Located in Sector 10, Gurugram
      </p>

      {/* Carousel */}
      <div className="w-full max-w-3xl p-4 animate-floating">
        <Carousel autoplay arrows>
          {["1.jpeg", "2.jpeg", "4.jpg", "3.jpeg"].map((image, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-70 p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={`/images/${image}`} // Assuming these images are located in the public directory
                alt={`Slide ${index + 1}`}
                className="w-full max-h-[400px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
