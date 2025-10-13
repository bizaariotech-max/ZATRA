import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ErrorPage from '../pages/ErrorPage'
import AdminConfigOutlet from '../pages/admin/configrations/AdminConfigOutlet'
import LocalRepresentative from '../pages/station/cityStationContacts/LocalRepresentative'
import Administrative from '../pages/station/cityStationContacts/Administrative'
import IndustryAssociate from '../pages/station/cityStationContacts/IndustryAssociate'

const StationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<h1>Station Dashboard</h1>} />
                <Route path="city-station-contacts/" element={<AdminConfigOutlet />}>
                    <Route path="local-representative" element={<LocalRepresentative />} />
                    <Route path="administrative" element={<Administrative />} />
                    <Route path="industry-associate" element={<IndustryAssociate />} />

                    {/* Catch-all inside configuration */}
                    <Route path="*" element={<ErrorPage />} />
                </Route>
                {/* Catch-all inside admin */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default StationRoutes