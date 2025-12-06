import React from 'react';



import Banner from '../Banner/Banner';
import OurWorks from '../OurWorks/OurWorks';

import Brands from '../Brands/Brands';
import OurServices from '../OurServices/OurServices';
import Reviews from '../Reviews/Reviews';


const reviewsPromise = fetch('/reviews.json').then(res=>res.json())
const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <OurWorks></OurWorks>
           <OurServices></OurServices>
           <Brands></Brands>
           <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;