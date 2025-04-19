import { useState } from "react";
import React from "react";
import { FaUser, FaEnvelope, FaPaperPlane, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex = /^[A-Za-z\s]{2,}$/;

    if (!formData.fullName || !nameRegex.test(formData.fullName)) {
      tempErrors.fullName = "Please enter a valid name (minimum 2 characters, only letters)";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.message || formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
    }

    if (formData.message.length > 500) {
      tempErrors.message = "Message cannot exceed 500 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: "", email: "", message: "" });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#E1EEBC]">
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
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-sm p-6 md:p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-primary/10 text-[#328E6E] rounded-lg flex items-center">
              <FaCheckCircle className="mr-2" />
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#328E6E] mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${errors.fullName ? 'border-destructive' : 'border-input'}`}
                  placeholder="Your Full Name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <FaExclamationCircle className="mr-1" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#328E6E] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-destructive' : 'border-input'}`}
                  placeholder="Your Email Address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <FaExclamationCircle className="mr-1" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#328E6E] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${errors.message ? 'border-destructive' : 'border-input'}`}
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <FaExclamationCircle className="mr-1" /> {errors.message}
                </p>
              )}
              <p className="mt-1 text-sm text-accent">
                {formData.message.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#328E6E] text-primary-foreground py-2 px-4 rounded-md hover:bg-emerald-800/90 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitted}
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-input">
            <h2 className="text-xl font-semibold text-[#328E6E] mb-4">Other Ways to Reach Us</h2>
            <div className="grid md:grid-cols-2 gap-4 text-accent">
              <div className="p-4 bg-secondary text-[#328E6E] rounded-md">
                <h3 className="font-medium text-[#328E6E] mb-2">Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
              <div className="p-4 bg-secondary text-[#328E6E] rounded-md">
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