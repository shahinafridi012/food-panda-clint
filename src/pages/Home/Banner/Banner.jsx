import { useState } from "react";
import img1 from "../../../assets/banner/img1.jpg";
import img2 from "../../../assets/banner/img2.jpg";
import img3 from "../../../assets/banner/img3.jpg";
import img4 from "../../../assets/banner/img4.jpg";

const slides = [img1, img2, img3, img4];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[600px] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent flex items-center">
              <div className="text-white pl-10 w-1/2 space-y-6">
                <h2 className="text-5xl font-bold leading-tight">
                  Affordable Price For Car Servicing
                </h2>
                <p className="text-lg text-gray-200">
                  There are many variations of passages available, but the
                  majority have suffered alteration in some form.
                </p>
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Discover More
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-md transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-md transition"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
