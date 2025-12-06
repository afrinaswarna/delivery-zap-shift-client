import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { RxArrowTopRight } from "react-icons/rx";
const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div className="relative">
        <img src={bannerImg1} />

        <div className="absolute top-93 left-15 flex gap-2 items-center">
          {/* <p className='w-[500px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p> */}
          <button className="btn bg-primary px-4 py-2 rounded-4xl">
            Track Your Parcel
          </button>
          <button className="rounded-full bg-secondary text-white p-3">
            <RxArrowTopRight />
          </button>
          <button className="btn">Be a Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg2} />
        <div className="absolute top-93 left-15 flex gap-2 items-center">
          {/* <p className='w-[500px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p> */}
          <button className="btn bg-primary px-4 py-2 rounded-4xl">
            Track Your Parcel
          </button>
          <button className="rounded-full bg-secondary text-white p-3">
            <RxArrowTopRight />
          </button>
          <button className="btn">Be a Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg3} />
        <div className="absolute top-93 left-15 flex gap-2 items-center">
          {/* <p className='w-[500px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p> */}
          <button className="btn bg-primary px-4 py-2 rounded-4xl">
            Track Your Parcel
          </button>
          <button className="rounded-full bg-secondary text-white p-3">
            <RxArrowTopRight />
          </button>
          <button className="btn">Be a Rider</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
