import React, { useState } from "react";
import { Navbar } from "../";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = { name, email, message };

    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 mt-8">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Have any questions or want to get in touch? We're here to help.
            Please feel free to reach out to us using the contact form below or
            through our contact information.
          </p>

          <div className="flex justify-center space-x-8 mb-16">
            {/* Contact Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 w-full sm:w-96 md:w-[400px]">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">
                Our Address
              </h4>
              <p className="text-gray-600">
                Blue Bells Public School <br />
                Sector 10, Gurugram <br />
                Haryana, India
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-8 w-full sm:w-96 md:w-[400px]">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">
                Phone & Email
              </h4>
              <p className="text-gray-600">
                📞 Phone: +91 123 456 7890 <br />
                ✉️ Email: contact@bluebells.edu
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-gray-200 p-8 shadow-lg rounded-lg">
            <h3 className="text-3xl font-semibold text-blue-900 text-center mb-8">
              Get In Touch
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-lg font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Write your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Write your E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col mt-6">
                <label
                  htmlFor="message"
                  className="text-lg font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Write your message here"
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status && (
              <div className="mt-4 text-center text-gray-700">
                <p>{status}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
