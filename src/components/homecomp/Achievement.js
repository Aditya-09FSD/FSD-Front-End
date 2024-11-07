import React from "react";
import { Navbar } from "../";

function Achievements() {
  return (
    <>
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Achievements</h2>
          <ul className="mt-6 space-y-4 text-lg max-w-xl mx-auto">
            <li>
              🏆 Excellent academic results in national and international exams
            </li>
            <li>
              🏅 Outstanding performances in sports and extracurricular
              activities
            </li>
            <li>
              🌟 Numerous awards and recognitions for students and faculty
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Achievements;
