import React from 'react'
import WebsiteLayout from '../layouts/WebsiteLayout'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/website/index'
import ErrorPage from '../pages/ErrorPage'
import GangaDarshan from '../pages/website/GangaDarshan'
import Religious from '../pages/website/Religious'
import About from '../pages/website/About'
import ODOP from '../pages/website/ODOP'

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="ganga-darshan" element={<GangaDarshan />} />
        <Route path="religious" element={<Religious />} />
         <Route path="about" element={<About />} />
        <Route path="odop" element={<ODOP />} />
        {/* Catch-all */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default WebsiteRoutes