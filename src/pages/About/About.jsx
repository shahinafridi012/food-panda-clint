import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/banner/about.jpg"; 
const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-orange-600">About Our Restaurant</h2>
          <h3 className="text-2xl font-semibold text-gray-800">
            A Taste Beyond Food
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We are dedicated to providing exceptional dining experiences with a blend of local and international flavors. Every dish is prepared with care, bringing joy to every customer.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <span className="text-orange-600 text-xl">✔</span>
              <span className="text-gray-700">Fresh and high-quality ingredients.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-600 text-xl">✔</span>
              <span className="text-gray-700">Professional chefs and friendly staff.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-600 text-xl">✔</span>
              <span className="text-gray-700">Comfortable, aesthetic dining environment.</span>
            </li>
          </ul>

          <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Learn More
          </button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImage}
            alt="About Restaurant"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
