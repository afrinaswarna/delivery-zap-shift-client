import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navber/Navbar';

const RootLayout = () => {
    return (
       <div className='bg-gray-100'>
         <div className='max-w-5xl mx-auto space-y-5'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
       </div>
    );
};

export default RootLayout;
