import { useState, useEffect, useRef } from "react";
import img1 from "../../../assets/banner/img1.jpg";
import img2 from "../../../assets/banner/img2.jpg";
import img3 from "../../../assets/banner/img3.jpg";
import img4 from "../../../assets/banner/img4.jpg";

const slides = [
  {
    image: img1,
    title: "Savor the Taste of Perfection",
    subtitle: "Explore our chef-curated dishes, crafted with love and the freshest ingredients.",
    btnText: "Order Now",
    gradient: "from-red-500 via-pink-500 to-yellow-400",
  },
  {
    image: img2,
    title: "Experience Flavor Like Never Before",
    subtitle: "Delight in our finest meals made with passion and premium ingredients.",
    btnText: "View Menu",
    gradient: "from-purple-500 via-indigo-500 to-blue-400",
  },
  {
    image: img3,
    title: "Fresh Ingredients, Amazing Taste",
    subtitle: "Every dish is prepared with the freshest ingredients for an unforgettable experience.",
    btnText: "Book a Table",
    gradient: "from-green-400 via-lime-400 to-yellow-300",
  },
  {
    image: img4,
    title: "Indulge in Culinary Excellence",
    subtitle: "Treat yourself with our premium chef-specials and gourmet meals.",
    btnText: "Order Today",
    gradient: "from-pink-500 via-red-500 to-orange-400",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const slideDuration = 5000;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextSlide, slideDuration);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  // Watch-style progress
  useEffect(() => {
    if (!progressRef.current) return;
    let start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / slideDuration) * 100, 100);
      progressRef.current.style.width = `${percent}%`;
      if (percent < 100) requestAnimationFrame(step);
    };
    step();
  }, [current]);

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[600px] md:h-[700px] lg:h-[750px] object-cover filter brightness-70 blur-sm"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div
                className={`w-full md:w-1/2 pl-6 md:pl-16 lg:pl-24 pt-10 md:pt-20 space-y-4 transition-all duration-1000 ${
                  current === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                {/* Title with dynamic gradient */}
                <h2
                  className={`text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-r ${slide.gradient}`}
                >
                  {slide.title}
                </h2>

                {/* Decorative underline */}
                <div className={`w-24 h-1 rounded-full bg-gradient-to-r ${slide.gradient} mt-2`}></div>

                {/* Subtitle */}
                <p className="text-base md:text-lg lg:text-xl text-gray-200">{slide.subtitle}</p>

                {/* Button */}
                <button
                  className={`mt-3 px-6 py-3 bg-gradient-to-r ${slide.gradient} text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                >
                  {slide.btnText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
    

      {/* Nav buttons */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-6 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={prevSlide}
          className="px-5 py-2 bg-red-600/80 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-5 py-2 bg-red-600/80 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
        >
          Next
        </button>
      </div>

      {/* Watch-style progress bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 rounded-full transition-all duration-300"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
