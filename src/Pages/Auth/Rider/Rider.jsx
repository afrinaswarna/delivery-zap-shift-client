import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const region = useWatch({ control, name: "region" });
  const districtByRegion = (region) => {
    const districtRegion = serviceCenters.filter((c) => c.region === region);
    const districts = districtRegion.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    // console.log(data)
    axiosSecure.post("/riders", data).then((res) => {
        console.log('application has been register',res.data)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your application has been register. We will contact you soon",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return (
    <div>
      <h2 className="text-center text-4xl text-secondary font-bold mt-10">
        Be a Rider
      </h2>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            <label className="label text-black">Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full text-black"
              placeholder="Rider Name"
            />
            <label className="label text-black">Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full text-black"
              placeholder="Rider Email"
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("region")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("district")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(region).map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>

            <label className="label text-black">Pickup Instruction</label>
            <textarea
              type="text"
              className="border border-gray-300 rounded-lg"
              name=""
              {...register("pickupInstruction")}
              id=""
              cols="10"
            ></textarea>
          </fieldset>

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Details</h4>
            <label className="label text-black">Driving License</label>
            <input
              type="text"
              {...register("license")}
              className="input w-full text-black"
              placeholder="Driving License"
            />
            <label className="label text-black">Bike</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full text-black"
              placeholder="Bike Number"
            />
            <label className="label text-black">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full text-black"
              placeholder="NID"
            />
          </fieldset>

          <input
            type="submit"
            className="btn bg-primary text-black"
            value="Apply to be a Rider"
          />
        </div>
      </form>
    </div>
  );
};

export default Rider;
