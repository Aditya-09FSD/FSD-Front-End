import React from 'react';

function Hero() {
  return (
    <section className="h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/path-to-your-hero-image.jpg')` }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Blue Bells Public School</h1>
        <p className="mt-4 text-xl">Nurturing Young Minds</p>
        <p className="mt-2">Discover a world of excellence at Blue Bells Public School, located in Sector 10, Gurugram.</p>
      </div>
    </section>
  );
}

export default Hero;
