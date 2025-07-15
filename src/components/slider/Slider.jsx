import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaBolt, FaShieldAlt, FaTruck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import banner1 from "../../assets/images/banner-1.webp";
import banner2 from "../../assets/images/banner-2.webp";
import banner3 from "../../assets/images/banner-3.webp";

const slides = [
  {
    id: 0,
    src: banner1,
    alt: "Premium Gaming Keyboards",
    title: "Mechanical Excellence",
    description: "Experience lightning-fast response times",
    cta: "Shop Now",
    link: "/shop?category=keyboards",
    badge: "New"
  },
  {
    id: 1,
    src: banner2,
    alt: "Professional Gaming Mice",
    title: "Precision Control",
    description: "Dominate with flawless tracking",
    cta: "Shop Now",
    link: "/shop?category=mice",
    badge: "Popular"
  },
  {
    id: 2,
    src: banner3,
    alt: "Immersive Gaming Headsets",
    title: "Crystal Clear Audio",
    description: "Hear every detail that matters",
    cta: "Shop Now",
    link: "/shop?category=headsets",
    badge: "Limited"
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const length = slides.length;

  const goTo = (idx) => {
    const wrappedIndex = (idx + length) % length;
    setCurrent(wrappedIndex);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (!isPaused) {
      startAuto();
    }
    return () => clearInterval(intervalRef.current);
  }, [current, isPaused]);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000); // autoplay every 5s
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-5 pb-1 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF1E1E]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Slider Container */}
      <div
        className="relative container mx-auto px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          {slides.map((slide, idx) => {
            const offset = ((idx - current) + length) % length;
            const isActive = offset === 0;
            const isNext = offset === 1;
            const isPrev = offset === length - 1;

            let translateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;

            if (isActive) {
              translateX = 0;
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (isNext || isPrev) {
              translateX = isNext ? 50 : -50;
              scale = 0.85;
              opacity = 0.3;
              zIndex = 5;
            } else {
              opacity = 0;
              scale = 0.8;
              zIndex = 0;
            }

            return (
              <div
                key={slide.id}
                className="absolute w-full max-w-5xl transition-all duration-1000 ease-out"
                style={{
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                      {/* Badge */}
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF1E1E]/20 border border-[#FF1E1E]/30 text-[#FF1E1E] rounded-full text-sm font-semibold">
                          <HiSparkles />
                          {slide.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                        {slide.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-300 text-xl mb-8 max-w-md">
                        {slide.description}
                      </p>

                      {/* CTA Button */}
                      <div className={`transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Link
                          to={slide.link}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                        >
                          {slide.cta}
                          <FaChevronRight />
                        </Link>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF1E1E]/10 to-transparent" />
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className={`max-w-full max-h-full object-contain transition-all duration-1000 ${isActive ? 'scale-100 rotate-0' : 'scale-90 rotate-2'
                          }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#FF1E1E]/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#FF1E1E]/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 ${idx === current
                ? 'w-8 h-2 bg-[#FF1E1E]'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                } rounded-full`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Features Bar - Simplified */}
      {/* <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-3">
            <FaTruck className="text-[#FF1E1E] text-xl" />
            <span className="text-gray-300">Free Shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-[#FF1E1E] text-xl" />
            <span className="text-gray-300">2 Year Warranty</span>
          </div>
          <div className="flex items-center gap-3">
            <FaBolt className="text-[#FF1E1E] text-xl" />
            <span className="text-gray-300">Fast Support</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}