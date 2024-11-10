import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import styled, { keyframes } from "styled-components";

// Keyframe for gentle background floating animation
const floatBackground = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Floating shapes in background
const BackgroundShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(80px);
  animation: ${floatBackground} 10s ease-in-out infinite;
`;

// Title styling with elegance and animation
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0d47a1;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  animation: fadeIn 2s ease;
  text-align: center;
`;

// Subtitle styling with refined look and subtle animation
const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #37474f;
  margin: 0.5rem 0;
  opacity: 0;
  animation: fadeInSlide 1.5s ease 0.5s forwards;
  text-align: center;
`;

// Fade-in and slide animation for carousel and text
const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Floating Carousel Container
const CarouselContainer = styled.div`
  animation: ${floatBackground} 6s ease-in-out infinite;
  width: 100%;
  max-width: 700px;
  padding: 20px; /* Space around carousel for cleaner look */
`;

// Carousel Slide Wrapper to add black background and padding
const SlideWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7); /* Dark background instead of white */
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

// Carousel Image Styling with soft shadow and hover effect
const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 400px;
  border-radius: 15px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

// ArrowButton styling
const ArrowButton = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 20;
  transform: translateY(-50%);

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/anime-school-background-dh3ommnxthw4nln7.jpg')`,
      }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Blue Bells Public School
        </h1>
        <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-white">
          Nurturing Young Minds
        </p>
        <p className="mt-1 sm:mt-2 text-white text-sm sm:text-base">
          Discover a world of excellence at Blue Bells Public School, located in
          Sector 10, Gurugram.
        </p>
      </div>

      <div className="w-full max-w-3xl lg:max-w-4xl relative">
        <Carousel
          autoplay
          prevArrow={<ArrowButton className="prev-arrow">{"<"}</ArrowButton>}
          nextArrow={<ArrowButton className="next-arrow">{">"}</ArrowButton>}
        >
          {["1.jpeg", "2.jpeg", "4.jpg", "3.jpeg"].map((image, index) => (
            <SlideWrapper key={index}>
              <CarouselImage src={`/images/${image}`} alt={`Slide ${index + 1}`} />
            </SlideWrapper>
          ))}
        </Carousel>
      </CarouselContainer>
    </section>
  );
};

export default Hero;
