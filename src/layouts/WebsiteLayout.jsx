import React from 'react'
import Navbar from '../components/website/Navbar'
import Footer from '../components/website/Footer'
import { Outlet } from 'react-router-dom'

const WebsiteLayout = () => {
    return (
        <div>
            <Navbar />
            {/* {children} */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default WebsiteLayout