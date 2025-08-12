import { useCallback } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useSlides } from "../../hooks/useSlides";

export default function Slider() {
    const { data } = useSlides();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 3000, stopOnMouseEnter: false }),
    ]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div className="relative w-full bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] sm:pt-6 pb-1 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-[#FF1E1E]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-72 h-40 sm:h-72 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative container mx-auto px-4">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {data?.map((slide) => (
                            <div
                                key={slide.id}
                                className="flex-[0_0_100%] px-2 sm:px-4 max-w-full"
                            >
                                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl h-[80vh]">
                                    <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">
                                        {/* Content */}
                                        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 z-10 order-2 lg:order-1">
                                            <div className="mb-3 sm:mb-6">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-[#FF1E1E]/20 border border-[#FF1E1E]/30 text-[#FF1E1E] rounded-full text-xs sm:text-sm font-semibold">
                                                    <HiSparkles />
                                                    {slide.badge}
                                                </span>
                                            </div>

                                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-snug">
                                                {slide.title}
                                            </h2>

                                            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-5 sm:mb-8 max-w-md">
                                                {slide.short_description}
                                            </p>

                                            <Link
                                                to={slide.button_url}
                                                className="inline-flex  justify-between w-[50%] items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2 sm:py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                                            >
                                                {slide.button_text}
                                                <FaChevronRight />
                                            </Link>
                                        </div>

                                        {/* Image */}
                                        <div className="relative h-full flex items-center justify-center p-4 sm:p-8 order-1 lg:order-2">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF1E1E]/10 to-transparent opacity-50 lg:opacity-100" />
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="max-w-[60%] sm:max-w-[80%] lg:max-w-full max-h-full object-contain transition-all duration-1000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                {/* <button
                    onClick={scrollPrev}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 sm:bg-white/10 hover:bg-[#FF1E1E]/20 border border-white/30 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 sm:bg-white/10 hover:bg-[#FF1E1E]/20 border border-white/30 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
                >
                    <FaChevronRight />
                </button> */}
            </div>
        </div>
    );
}
