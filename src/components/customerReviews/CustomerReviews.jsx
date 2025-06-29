import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaStar } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const reviews = [
  {
    id: 1,
    userName: "Ahmed Fawzy",
    comment: "Amazing product and fast delivery. Highly recommended!",
    stars: 5,
    productName: "Gaming Mouse M908",
  },
  {
    id: 2,
    userName: "Sarah Mohamed",
    comment: "Great material and stylish look. Thank you!",
    stars: 4,
    productName: "Keyboard M28",
  },
  {
    id: 3,
    userName: "Mohamed Samy",
    comment: "Good product but packaging could be better.",
    stars: 3,
    productName: "Mouse Pad XL",
  },
  {
    id: 4,
    userName: "Nour Hussein",
    comment: "Best online shopping experience ever!",
    stars: 5,
    productName: "Gaming Headset G700",
  },
];

const CustomerReviews = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0b0b0b] via-[#1f1f1f] to-[#0b0b0b] text-white py-16 px-4 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E1E] to-[#D30000] mb-12">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-[#1a1a1a] border border-[#FF1E1E]/30 shadow-[0_0_20px_#FF1E1E20] p-6 rounded-2xl h-[250px] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
              <div className="overflow-hidden">
                <div className="flex gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <FaStar key={i} size={16} />
                  ))}
                </div>
                <h4 className="text-lg font-semibold mb-1">{review.userName}</h4>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {review.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#444] text-sm text-gray-400 italic">
                {review.productName}
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>



    </section>
  );
};

export default CustomerReviews;
