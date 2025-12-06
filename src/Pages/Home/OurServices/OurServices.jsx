import React from "react";

import img from "../../../assets/service.png";

const OurServices = () => {
  const services = [
    {
      title: "Express  & Standard Delivery",
      paragraph:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 46 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      paragraph:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      paragraph:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      paragraph:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      paragraph:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      paragraph:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="bg-secondary p-15 text-center text-white my-20 rounded-lg">
      <h2 className="font-bold text-2xl">Our Services</h2>
      <p className="text-sm">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. <br />
        From personal packages to business shipments — we deliver on time, every
        time.
      </p>
      <div className="grid grid-cols-3 gap-3 mt-8">
        {services.map((service) => (
          <div className="bg-white text-center p-4 rounded-lg text-secondary space-y-3 hover:bg-primary">
            <img className="mx-auto" src={img} alt="" />
            <h2 className="font-bold">{service.title}</h2>
            <p className="text-sm">{service.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
