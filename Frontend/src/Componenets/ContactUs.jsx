import { useState } from "react";
import React from "react";
import { FaUser, FaEnvelope, FaPaperPlane, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const ContactUs = () => {

  return (
    <div className="min-h-screen bg-[#E1EEBC] pt-10">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
          alt="Contact Us Hero"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Get in Touch With Us
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-[#E1EEBC] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)] p-6 md:p-8">

          <form action='https://formspree.io/f/xnndqrdk' method="POST" className="space-y-6 w-full">
            <div>
              <label htmlFor="fullName" className="block text-xl font-medium text-[#328E6E] mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-transparent `}
                  placeholder="Your Full Name"
                />
              </div>
              
            </div>

            <div>
              <label htmlFor="email" className="block text-xl font-medium text-[#328E6E] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full pl-10 pr-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Your Email Address"
                />
              </div>
             
            </div>

            <div>
              <label htmlFor="message" className="block text-xl font-medium text-[#328E6E] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className={`w-full px-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-primary focus:border-transparent `}
                placeholder="Your Message"
              />
             
              
            </div>

            <button
              type="submit"
              className="w-full bg-[#328E6E] text-primary-foreground py-2 px-4 rounded-md hover:bg-emerald-800/90 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-input ">
            <h2 className="text-xl font-semibold text-[#328E6E] mb-4">Other Ways to Reach Us</h2>
            <div className="grid md:grid-cols-2 gap-4 text-accent ">
              <div className="p-4 text-[#328E6E] rounded-md bg-[#E1EEBC]">
                <h3 className="font-medium text-[#328E6E] mb-2">Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
              <div className="p-4 bg-[#E1EEBC] text-[#328E6E] rounded-md" >
                <h3 className="font-medium text-[#328E6E] mb-2">Contact Info</h3>
                <p>Email: info@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;