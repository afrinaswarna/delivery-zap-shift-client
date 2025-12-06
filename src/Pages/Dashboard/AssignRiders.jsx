import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Rider from "../Auth/Rider/Rider";
import { SiXo } from "react-icons/si";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState("");
  console.log(selectedParcel.senderDistrict);

  const { data: parcels = [],refetch:parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcel?deliveryStatus=pending-pickup"
      );
      // console.log(res.data)
      return res.data;
    },
  });
  //  console.log(parcels)
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });
console.log(riders)
  const openAssignRiderModal = (parcel) => {
    // console.log(parcel.senderDistrict)
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

   const handleAssignRider = (rider)=>{
    const riderAssignInfo ={
        riderName:rider.name,
        riderEmail:rider.email,
        riderId:rider._id,
        parcelId:selectedParcel._id,
       

    }
    axiosSecure.patch(`/parcel/${selectedParcel._id}`,riderAssignInfo)
    .then(res=>{
        if(res.data.modifiedCount){
            riderModalRef.current.close()
            parcelRefetch()
             Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `Rider has been assigned`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
        }
    })
   }
  return (
    <div>
      <h2 className="text-4xl text-center text-secondary font-bold">
        Assign Rider:{parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>TrackingId</th>
              <th>PickUp District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-small bg-primary text-black"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rider:{riders.length}!</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
               {
                riders.map((rider,i)=> <tr>
                  <th>{i+1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>
                    <button 
                    onClick={()=>handleAssignRider(rider)}
                     className="btn bg-primary text-black">Assign</button>
                  </td>
                </tr>)
               }
               
              
              </tbody>
            </table>
          </div>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
