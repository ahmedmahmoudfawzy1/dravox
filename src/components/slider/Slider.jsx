import { useEffect, useRef, useState } from "react";
import banner1 from "../../assets/images/banner-1.webp";
import banner2 from "../../assets/images/banner-2.webp";
import banner3 from "../../assets/images/banner-3.webp";

const slides = [
  { id: 0, src: banner1, alt: "Banner 1" },
  { id: 1, src: banner2, alt: "Banner 2" },
  { id: 2, src: banner3, alt: "Banner 3" },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const length = slides.length;

  const goTo = (idx) => {
    const wrappedIndex = (idx + length) % length;
    setCurrent(wrappedIndex);
  };

  const next = () => goTo(current + 1);

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000); // autoplay every 3s
  };

  return (
    <div className="">
      <div className="relative w-[80%] h-[50vh] mx-auto flex items-center justify-center overflow-hidden">
        {slides.map((slide, idx) => {
          const offset = ((idx - current) + length) % length;
          let translateX = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 0;
          let blur = "none";

          if (offset === 0) {
            translateX = 0;
            scale = 1;
            opacity = 1;
            zIndex = 10;
          } else if (offset === 1 || offset === length - 1) {
            translateX = offset === 1 ? 60 : -60;
            scale = 0.9;
            opacity = 0.4;
            zIndex = 5;
            blur = "blur(2px)";
          } else {
            opacity = 0;
            zIndex = 0;
          }

          return (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              className="absolute w-2/3 max-w-3xl h-auto object-contain transition-all duration-700 rounded-xl shadow-lg"
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
                filter: blur,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
