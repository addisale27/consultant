import { FaComment } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { testimonials } from "@/utils/testimonial";
import { RxArrowTopRight } from "react-icons/rx";

const Testimonial = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="flex items-center justify-center mb-10">
        <div className="text-4xl md:text-5xl font-bold flex gap-2 items-center">
          <div className="bg-blue-700 rounded-full w-[60px] h-[60px] p-5 flex items-center justify-center shadow-lg">
            <span className="text-white">
              <FaComment size={36} />
            </span>
          </div>
          <span className="text-gray-800">What Our Students Say?</span>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <Swiper
          breakpoints={{
            340: { slidesPerView: 1, spaceBetween: 15 },
            700: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          pagination={{ clickable: true }}
          className="max-w-[90%] lg:max-w-[80%]"
        >
          {testimonials.map((testi) => {
            return (
              <SwiperSlide key={testi.id} className="relative">
                <TestimonialCard testimony={testi} />
                <RxArrowTopRight className="absolute bottom-5 right-5 w-[35px] h-[35px] text-gray-600 hover:text-blue-500 transition duration-200 transform hover:rotate-45" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
