import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import star_people from '../../../assets/brands/start_people.png'
import { Autoplay } from "swiper/modules";


const Brands = () => {

    const brandLogo = [amazon,amazon_vector,casio,moonstar,randstad,star,star_people]
  return (
  <div className="my-20">
    <h2 className="text-center text-secondary font-bold my-10 text-2xl">We've helped thousands of sales teams</h2>
     <div>
     <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      modules={[Autoplay]}
    >
      
      {
        brandLogo.map(logo=><SwiperSlide><img src={logo} alt="" /></SwiperSlide>)
      }
    </Swiper>
   </div>
  </div>
  );
};

export default Brands;
