import { IoCartOutline } from "react-icons/io5";
import dravoxMouse from "../../assets/images/dravoxmouse.webp";
import { CiCircleCheck } from "react-icons/ci";
export default function WhoDravox() {
  return (
    <section className="mt-8">
      <div className="container">
        <div className="grid  sm:grid-cols-1 md:grid-cols-2  gap-8">
          <div className="flex flex-col gap-5">
            <h3 className="text-[1.8rem] font-medium">Who We Are? </h3>
            <p className="text-[1.2rem] leading-relaxed">
              At Techno Zone Gaming, we understand the importance of having the
              right gear to dominate the competition. Whether you’re a pro or a
              casual enthusiast, we have something for every gamer. We offer a
              wide selection of products, ensuring you get the performance and
              durability you need to take your gameplay to the next level.
            </p>
            <div className="flex justify-between ">
              <div className="flex gap-2 items-start">
                <IoCartOutline className="text-primary-color text-[40px] font-bold mt-2" />
                <div>
                  <p className=" text-[36px] font-bold">300+</p>
                  <p className="text-[18px]">Products Launched</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <CiCircleCheck className="text-primary-color text-[40px] font-bold mt-2" />
                <div>
                  <p className=" text-[36px] font-bold">99.8%</p>
                  <p className="text-[18px]">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <img
              src={dravoxMouse}
              alt="Gaming Gear"
              className="w-full h-full object-contain rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
