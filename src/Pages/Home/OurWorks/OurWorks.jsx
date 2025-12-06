import React from "react";

const OurWorks = () => {
  const works = [
    {
      image: "https://i.ibb.co.com/k6cZ766h/fi-9618754.png",
      title: "Booking Pick & Drop",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      image: "https://i.ibb.co.com/k6cZ766h/fi-9618754.png",
      title: "Cash On Delivery",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      image: "https://i.ibb.co.com/k6cZ766h/fi-9618754.png",
      title: "Delivery Hub",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      image: "https://i.ibb.co.com/k6cZ766h/fi-9618754.png",
      title: "Booking SME & Corporate",
      paragraph:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-secondary my-8">How it Works</h2>
      <div className="flex gap-4">
        {works.map((work) => (
          <div className="bg-white p-4 space-y-3 rounded-lg">
            <img src={work.image} alt="" />
            <h2 className="font-bold text-secondary">{work.title}</h2>
            <p className="text-sm">{work.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWorks;
