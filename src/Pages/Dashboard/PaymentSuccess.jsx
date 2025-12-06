import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [paymentInfo,setPaymentInfo] = useState({})
    const axiosSecure = useAxiosSecure()
    console.log(sessionId)

    useEffect(()=>{
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
            setPaymentInfo({
                trackingId:res.data.trackingId,
                transactionId:res.data.transactionId




            })
        })
        
    },[sessionId,axiosSecure])
    return (
        <div className='my-40'>
            <h2 className='text-center text-secondary text-2xl font-bold'>Payment SuccessFull</h2>

            <p>TrackingId:{paymentInfo.trackingId}</p>
            <p>TransactionId:{paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;