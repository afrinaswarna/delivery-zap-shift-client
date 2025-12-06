import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const {refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updatedApprovalStatus = (rider, status) => {
    const updatedInfo = { status: status ,email:rider.email};
    axiosSecure.patch(`/riders/${rider._id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider application has been ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      
    });

  };

  const handleApproval = (rider) => {
        updatedApprovalStatus(rider, "approved");
      };

      const handleRejected = (rider)=>{
        updatedApprovalStatus(rider,'rejected')
      }
  return (
    <div>
      <h2 className="text-center text-secondary text-4xl font-bold mt-10">
        Rider Application Approval:{riders.length}
      </h2>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Application Status</th>
            <th>Work Status</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>
                <p
                  className={`${
                    rider.status === "approved"
                      ? "text-green-900"
                      : "text-red-800"
                  }`}
                >
                  {rider.status}
                </p>
              </td>
               <td>{rider.workStatus}</td>
              <td>{rider.district}</td>
              <td>
                <button
                  onClick={() =>handleApproval(rider)}
                  className="btn"
                >
                  <FaUserCheck />
                </button>
                <button onClick={()=>handleRejected(rider)} className="btn">
                  <IoPersonRemove />
                </button>
                <button className="btn">
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRider;
