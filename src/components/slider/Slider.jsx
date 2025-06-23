import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bannerImageOne from "../../assets/images/banner-1.webp";
import bannerImageTwo from "../../assets/images/banner-2.webp";
import bannerImageThree from "../../assets/images/banner-3.webp";
export default function Slider() {
  const slidesData = [
    {
      id: 1,
      title: "Slide 1",
      subtitle: "Subtitle 1",
      description:
        "Description 1Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores iste odio a facere modi dignissimos illo molestiae alias, magni earum beatae officia blanditiis dolore officiis labore dolor! Quod, adipisci.",
      image: `${bannerImageOne}`,
    },
    {
      id: 2,
      title: "Slide 2",
      subtitle: "Subtitle 2",
      description: "Description  ",
      image: `${bannerImageTwo}`,
    },
    {
      id: 3,
      title: "Slide 3",
      subtitle: "Subtitle 3",
      description:
        "Description 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores iste odio a facere modi dignissimos illo molestiae alias, magni earum beatae officia blanditiis dolore officiis labore dolor! Quod, adipisci.",
      image: `${bannerImageThree}`,
    },
  ];

  return (
    <Swiper
      speed={600}
      pagination={{ clickable: true }}
      parallax={true}
      modules={[Autoplay]}
      className="mySwiper"
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative  bg-cover bg-center"
            // style={{ backgroundImage: `url(${slide.image})` }}
          >
            <img src={slide.image} alt="" />
            <div className=""></div>
            {/* <div className="relative z-10 p-8 text-white min-h-[80vh] flex flex-col justify-center items-start">
              <h2
                className="text-4xl font-bold mb-2"
                data-swiper-parallax="-300"
              >
                {slide.title}
              </h2>
              <h4 className="text-xl mb-2 " data-swiper-parallax="-200">
                {slide.subtitle}
              </h4>
              <p data-swiper-parallax="-100" className="w-[50%]">
                {slide.description}
              </p>
            </div> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
