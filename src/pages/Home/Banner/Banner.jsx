import { useState, useEffect, useRef } from "react";
import img1 from "../../../assets/banner/img1.jpg";
import img2 from "../../../assets/banner/img2.jpg";
import img3 from "../../../assets/banner/img3.jpg";
import img4 from "../../../assets/banner/img4.jpg";

const slides = [img1, img2, img3, img4];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null); // auto-scroll reference
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  // Auto scroll every 2 seconds, pause on hover
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextSlide, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden  shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
              {/* Text Content */}
              <div
                className={`text-white pl-10 w-full md:w-1/2 space-y-6 transition-all duration-700 ${
                  current === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <h2 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                  Affordable Price For Car Servicing
                </h2>
                <p className="text-lg md:text-xl text-gray-200">
                  Get the best quality car service at an unbeatable price. Your
                  satisfaction is our priority.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              current === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
