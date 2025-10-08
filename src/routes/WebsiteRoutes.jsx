import React from 'react'
import WebsiteLayout from '../layouts/WebsiteLayout'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/website/index'
import ErrorPage from '../pages/ErrorPage'
import GangaDarshan from '../pages/website/GangaDarshan'

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<LandingPage />} />
         <Route path="ganga-darshan" element={<GangaDarshan />} />
        {/* Catch-all */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default WebsiteRoutes