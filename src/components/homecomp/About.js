import React from "react";
import { Navbar } from "../";
function About() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Blue Bells Public School is committed to providing a holistic
            education that fosters academic excellence, personal growth, and
            social responsibility. Our dedicated faculty and supportive
            environment create a nurturing space for students to thrive.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
