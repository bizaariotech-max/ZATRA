import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/destination/home'

const DestinationRoutes = () => {
  return (
     <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Home />} />
                {/* Catch-all inside admin */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
  )
}

export default DestinationRoutes
