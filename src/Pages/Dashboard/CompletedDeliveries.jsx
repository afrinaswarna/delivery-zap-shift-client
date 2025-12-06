import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
      const { user } = useAuth();
      const { data: parcels = [] ,refetch} = useQuery({
        queryKey: ["parcel", user?.email, "driver-assigned"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/parcel/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`);
        
          return res.data;
        },
      });

      const calculatePayout = parcel =>{
        if(parcel.senderDistrict === parcel.receiverDistrict){
            return parcel.cost * .8
        }
        else{
            return parcel.cost*.6
        }
      }
    return (
        <div>
            <h2 className='text-4xl text-secondary text-center font-bold mt-10'>Completed Delivery:{parcels.length}</h2>
            <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              
              <th>Created At</th>
              <th>TrackingId</th>
              <th>PickUp District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
               
                <td>{parcel.createdAt}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.senderDistrict}</td>
                 <td>{parcel.cost}</td>
                 <td>{calculatePayout(parcel)}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-small bg-primary text-black"
                  >
                    Cash out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default CompletedDeliveries;