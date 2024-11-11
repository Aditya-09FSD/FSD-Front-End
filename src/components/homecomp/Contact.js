import React, { useState } from "react";
import { Navbar } from "../";
import { Input, Button } from "antd";
import Swal from "sweetalert2";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        Swal.fire("Success", "Message sent successfully!", "success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire("Error", `Error: ${result.error}`, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send message.", "error");
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-8 lg:py-16 bg-blue-50">
        <div className="container mx-auto px-4 lg:px-8 text-center p-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6 lg:mb-8">
            Contact Us
          </h2>
          <p className="text-base lg:text-lg text-gray-700 max-w-2xl mx-auto mb-8 lg:mb-12">
            Have any questions or want to get in touch? We're here to help.
            Please feel free to reach out to us using the contact form below or
            through our contact information.
          </p>

          <div className="flex flex-wrap justify-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8 lg:mb-16">
            {/* Contact Info */}
            <div className="w-full sm:w-80 bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-6 lg:p-8">
              <h4 className="text-lg lg:text-xl font-semibold text-blue-800 mb-4">
                Our Address
              </h4>
              <p className="text-gray-600">
                Blue Bells Engineering College <br />
                Sector 10, Gurugram <br />
                Haryana, India
              </p>
            </div>

            <div className="w-full sm:w-80 bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-lg p-6 lg:p-8">
              <h4 className="text-lg lg:text-xl font-semibold text-blue-800 mb-4">
                Phone & Email
              </h4>
              <p className="text-gray-600">
                📞 Phone: +91 123 456 7890 <br />
                ✉️ Email: contact@bluebells.edu
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-gray-200 p-6 lg:p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl lg:text-3xl font-semibold text-blue-900 text-center mb-6 lg:mb-8">
              Get In Touch
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-base lg:text-lg font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    size="large"
                    placeholder="Write your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-base lg:text-lg font-medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    size="large"
                    placeholder="Write your E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-base lg:text-lg font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <Input.TextArea
                  id="message"
                  name="message"
                  rows={4}
                  size="large"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
