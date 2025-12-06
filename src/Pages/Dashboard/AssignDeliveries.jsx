import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { SiPanasonic } from "react-icons/si";

const AssignDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [] ,refetch} = useQuery({
    queryKey: ["parcel", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`);
    //   console.log(res.data)
      return res.data;
    },
  });

  const handleStatusUpdate = (parcel,status)=>{
const statusInfo = {
    deliveryStatus:status,
    riderId :parcel.riderId,
    trackingId:parcel.trackingId
}
let message = `parcel status is updated with ${status.split('-').join(' ')}`
   axiosSecure.patch(`/parcel/${parcel._id}/status`,statusInfo)
   .then(res=>{
     if(res.data.modifiedCount){
        refetch()
        Swal.fire({
              position: "top-end",
              icon: "success",
              title:message,
              showConfirmButton: false,
              timer: 1500,
            });
     }
   })

  }
  return (
    <div>
      <h2 className="text-4xl text-secondary font-bold text-center mt-10">
       Parcel Pending PIckup:{parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel,i)=> <tr>
              <th>{i+1}</th>
              <td>{parcel.parcelName}</td>
              <td>
              {
                parcel.deliveryStatus === 'driver-assigned'?<>
                  <button 
                onClick={()=>handleStatusUpdate(parcel,'rider-arriving')}
                className="btn btn-primary text-black">Accept</button>
                <button className="ms-2 btn btn-warning text-black">Reject</button></>:<span>Accepted</span>
              }
              </td>
              <td>
                <button onClick={()=>handleStatusUpdate(parcel,'parcel-picked-up')} className="btn bg-primary text-black">Mark as picked up</button>
                <button onClick={()=>handleStatusUpdate(parcel,'parcel-delivered')} className="ms-2 btn bg-primary text-black">Mark as delivered</button>
              </td>
            </tr>)}
           
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDeliveries;
