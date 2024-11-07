import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";

function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-black"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/anime-school-background-dh3ommnxthw4nln7.jpg')`,
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Blue Bells Public School</h1>
        <p className="mt-4 text-xl">Nurturing Young Minds</p>
        <p className="mt-2">
          Discover a world of excellence at Blue Bells Public School, located in
          Sector 10, Gurugram.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <Carousel autoplay infinite>
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Slide+1"
              alt="Slide 1"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Slide+2"
              alt="Slide 2"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Slide+3"
              alt="Slide 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Slide+4"
              alt="Slide 4"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Hero;
