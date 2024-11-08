import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import styled from "styled-components";

// Styled components for arrow buttons
const ArrowButton = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-black"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/anime-school-background-dh3ommnxthw4nln7.jpg')`,
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Blue Bells Public School</h1>
        <p className="mt-4 text-xl text-white">Nurturing Young Minds</p>
        <p className="mt-2 text-white">
          Discover a world of excellence at Blue Bells Public School, located in
          Sector 10, Gurugram.
        </p>
      </div>

      <div className="w-full max-w-4xl relative">
        <Carousel
          autoplay
          infinite
          prevArrow={<ArrowButton className="prev-arrow">{"<"}</ArrowButton>}
          nextArrow={<ArrowButton className="next-arrow">{">"}</ArrowButton>}
        >
          <div>
            <img
              src="/images/1.jpeg"
              alt="Slide 1"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "500px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                border: "5px solid #fff",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          <div>
            <img
              src="/images/2.jpeg"
              alt="Slide 2"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "500px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                border: "5px solid #fff",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          <div>
            <img
              src="/images/4.jpg"
              alt="Slide 3"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "500px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                border: "5px solid #fff",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          <div>
            <img
              src="/images/3.jpeg"
              alt="Slide 4"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "500px",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                border: "5px solid #fff",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
