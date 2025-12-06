import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    return (
       <div className="card w-80 bg-base-100 shadow-md rounded-xl p-6">
      {/* Quote icon */}
      <FaQuoteLeft className="text-teal-600 text-3xl mb-3" />

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {review.review}
      </p>

      <div className="border-b border-gray-300 mb-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-700"><img src={review.user_photoURL} alt="" /></div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">{review.userName}</h3>
          <p className="text-xs text-gray-500">{review.user_email}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;