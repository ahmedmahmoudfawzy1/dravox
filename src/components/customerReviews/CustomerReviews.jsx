import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    <section className="py-12 px-4 bg-[#0B0B0B] text-white relative">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-primary-color">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-[#2F2D2D] p-6 rounded-2xl shadow-lg h-[250px] flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <h4 className="text-lg font-bold text-white">
                  {review.userName}
                </h4>
                <p className="text-sm text-gray-300 mt-2">{review.comment}</p>
              </div>

              <div className="flex items-center gap-2 mt-6 border-t border-gray-600 pt-4">
                <span className="text-sm text-white font-medium">
                  {review.productName}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <div className="bg-primary-color p-2 rounded-full hover:bg-white hover:text-primary-color transition">
          <FaArrowLeft />
        </div>
      </div>
      <div className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <div className="bg-primary-color p-2 rounded-full hover:bg-white hover:text-primary-color transition">
          <FaArrowRight />
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
