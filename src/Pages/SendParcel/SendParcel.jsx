import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
// console.log(user)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiveRegion = useWatch({ control, name: "receiverRegion" });
  // console.log(regions)
  const districtByRegion = (region) => {
    const districtRegion = serviceCenters.filter((c) => c.region === region);
    const districts = districtRegion.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue payment",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcel", data).then((res) => {
          console.log("after saving data", res.data);
          navigate("/dashboard/my-parcels");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel has been created",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  return (
    <div className="space-y-5 p-4 bg-white rounded-lg">
      <h2 className="text-4xl font-bold text-secondary">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document */}
        <div>
          <h2 className="text-secondary font-semibold border-b border-gray-200 pb-2">
            Enter your parcel detail
          </h2>
          <label className="label mr-4 py-5">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info:name,weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8 border-b border-gray-200 py-5">
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full text-black"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full "
              placeholder="Parcel Weight (kg)"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div>
          {/* sender info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Sender Details</h4>
              <label className="label text-black">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full text-black"
                placeholder="Sender Name"
              />
              <label className="label text-black">Sender Email</label>
              <input
                type="text"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full text-black"
                placeholder="Sender Email"
              />

              {/* <label className="label text-black">Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full text-black"
                placeholder="Address"
              />
              <label className="label text-black">Sender Phone No</label>
              <input
                type="number"
                {...register("senderPhone")}
                className="input w-full text-black"
                placeholder="Sender Phone No"
              /> */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
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
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(senderRegion).map((r, i) => (
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
            {/* receiver info */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Receiver Details</h4>
              <label className="label text-black">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full text-black"
                placeholder="Receiver  Name"
              />
              <label className="label text-black">Receiver Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full text-black"
                placeholder="Receiver Email"
              />

              {/* <label className="label text-black">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full text-black"
                placeholder="Receiver Address"
              />
              <label className="label text-black">Receiver Phone No</label>
              <input
                type="number"
                {...register("receiverPhone")}
                className="input w-full text-black"
                placeholder="Receiver Phone No"
              /> */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
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
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(receiveRegion).map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </fieldset>
              <label className="label text-black">Delivery Instruction</label>
              <textarea
                type="text"
                className="border border-gray-300 rounded-lg"
                name=""
                {...register("deliveryInstruction")}
                id=""
                cols="10"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn bg-primary text-black"
          value="send parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
