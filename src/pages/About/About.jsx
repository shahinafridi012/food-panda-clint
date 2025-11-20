import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import aboutImage from "../../assets/banner/about.jpg";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-black text-neutral-200">

      {/* Top small gradient bar */}
      <div className="mb-12 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side - Text */}
        <motion.div
          className="space-y-7"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-red-500">Our Restaurant</span>
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold text-neutral-300">
            A Taste Beyond Food ✨
          </h3>

          <p className="text-neutral-400 leading-relaxed text-lg">
            At SomeFood, we blend tradition with innovation to create unforgettable
            dining experiences. From premium ingredients to handcrafted dishes,
            everything is made with love to bring you comfort and joy.
          </p>

          <ul className="space-y-4 text-lg">
            {[
              "Fresh and high-quality ingredients.",
              "Professional chefs & warm hospitality.",
              "A cozy, aesthetic dining atmosphere.",
              "Authentic flavors inspired from around the world.",
            ].map((text, i) => (
              <li key={i} className="flex items-start space-x-3">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-red-500 text-xl"
                >
                  ✔
                </motion.span>
                <span className="text-neutral-400">{text}</span>
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg font-semibold shadow-md transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={aboutImage}
            alt="Restaurant Interior"
            className="w-full rounded-xl shadow-xl object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default About;
