import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

const Payment = () => {
    const {parcelId} = useParams()
    // console.log(parcelId)

    const axiosSecure = useAxiosSecure()
    const {isLoading,data:parcel} = useQuery({
        queryKey:['parcel',parcelId],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/parcel/${parcelId}`) 
            return res.data

        }
    })
    console.log(parcel)
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    const handlePayment =async()=>{
        const paymentInfo = {
            cost:parcel.cost,
            parcelName:parcel.parcelName,
            senderEmail:parcel.senderEmail,
            parcelId:parcel._id
        }

        const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log(res.data)
        window.location.href=res.data.url
    }
    return (
        <div className='my-10 text-center space-y-4'>
            <h2 className='text-center text-2xl text-secondary font-bold '>Please Pay ${parcel.cost} for:{parcel.parcelName}</h2>

            <button onClick={handlePayment} className='btn bg-primary text-black font-bold'>Please Pay</button>
        </div>
    );
};

export default Payment;