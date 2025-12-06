import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  // console.log(reviews);
  return (
    <div className="my-20">
      <div className="text-center my-10">
        <h2 className="font-bold text-4xl text-secondary">Reviews</h2>
        <p className="text-sm text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Eos impedit consequuntur at blanditiis, fuga a. Necessitatibus odio
          dolore porro tempore.
        </p>
      </div>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination,Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
