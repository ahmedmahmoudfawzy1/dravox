import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import { FaStar, FaQuoteLeft, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const reviews = [
  {
    id: 1,
    userName: "Ahmed Fawzy",
    userRole: "Pro Gamer",
    comment: "The M908 mouse transformed my gaming experience! The precision and response time are incredible. Best purchase I've made this year!",
    stars: 5,
    productName: "IMPACT M908 Gaming Mouse",
    verified: true,
    avatar: "AF"
  },
  {
    id: 2,
    userName: "Sarah Mohamed",
    userRole: "Content Creator",
    comment: "The RGB lighting on this keyboard is stunning! Build quality is exceptional and the mechanical switches feel amazing. Highly recommend!",
    stars: 5,
    productName: "Mechanical Keyboard K530",
    verified: true,
    avatar: "SM"
  },
  {
    id: 3,
    userName: "Mohamed Samy",
    userRole: "Casual Gamer",
    comment: "Great value for money. The mouse pad provides excellent tracking and the size is perfect for my setup. Would buy again!",
    stars: 4,
    productName: "Premium Mouse Pad XL",
    verified: true,
    avatar: "MS"
  },
  {
    id: 4,
    userName: "Nour Hussein",
    userRole: "Streamer",
    comment: "Crystal clear audio and the noise cancellation is top-notch! My audience loves the improved sound quality. Dravox delivered excellence!",
    stars: 5,
    productName: "Gaming Headset G700",
    verified: true,
    avatar: "NH"
  },
  {
    id: 5,
    userName: "Ali Hassan",
    userRole: "Competitive Player",
    comment: "Lightweight, responsive, and durable. This mouse gives me the edge in competitive matches. Customer service was also fantastic!",
    stars: 5,
    productName: "Pro Gaming Mouse",
    verified: true,
    avatar: "AH"
  }
];

const CustomerReviews = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
            <FaStar className="text-[#FF1E1E] text-2xl" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our community says about their Dravox experience
          </p>

          {/* Average Rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-2xl" />
              ))}
            </div>
            <span className="text-white text-xl font-bold">4.9</span>
            <span className="text-gray-400">from 2,000+ reviews</span>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".review-next",
              prevEl: ".review-prev",
            }}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="group relative h-full">
                  <div className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02]">
                    {/* Quote Icon */}
                    <FaQuoteLeft className="absolute top-6 right-6 text-[#FF1E1E]/20 text-3xl" />

                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 bg-gradient-to-br from-[#FF1E1E] to-[#ff4444] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {review.avatar}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                          {review.userName}
                          {review.verified && (
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </h4>
                        <p className="text-gray-400 text-sm">{review.userRole}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${i < review.stars ? "text-yellow-500" : "text-gray-600"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                      "{review.comment}"
                    </p>

                    {/* Product */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-400">Purchased:</p>
                      <p className="text-sm text-[#FF1E1E] font-medium">
                        {review.productName}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-[#FF1E1E] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="review-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 bg-white/10 hover:bg-[#FF1E1E]/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20">
            <FaArrowLeft />
          </button>

          <button className="review-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 bg-white/10 hover:bg-[#FF1E1E]/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20">
            <FaArrowRight />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-gray-400">
            <HiSparkles className="text-[#FF1E1E]" />
            <span className="text-sm">100% Authentic Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <HiSparkles className="text-[#FF1E1E]" />
            <span className="text-sm">Verified Purchases Only</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <HiSparkles className="text-[#FF1E1E]" />
            <span className="text-sm">30-Day Return Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;