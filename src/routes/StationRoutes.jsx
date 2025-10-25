import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ErrorPage from '../pages/ErrorPage'
import AdminConfigOutlet from '../pages/admin/configrations/AdminConfigOutlet'
import LocalRepresentative from '../pages/station/cityStationContacts/LocalRepresentative'
import Administrative from '../pages/station/cityStationContacts/Administrative'
import IndustryAssociate from '../pages/station/cityStationContacts/IndustryAssociate'
import StationIndicator from '../pages/station/cityStationContacts/StationIndicator'
import StationSpecialities from '../pages/station/cityStationContacts/StationSpecialities'
import TouristHelpline from '../pages/station/cityStationContacts/TouristHelpline'
import GovtScheme from '../pages/station/cityStationContacts/GovtScheme'
import InvestmentOpportunity from '../pages/station/cityStationContacts/InvestmentOpportunity'
import Destination from '../pages/station/destination/Destination'
import StationAssetsList from '../pages/admin/stationAdmin/StationAssetsList'

const StationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<h1>Station Dashboard</h1>} />
                <Route path="city-station-contacts/" element={<AdminConfigOutlet />}>
                    <Route path="local-representative" element={<LocalRepresentative />} />
                    <Route path="administrative" element={<Administrative />} />
                    <Route path="station-indicator" element={<StationIndicator />} />
                    <Route path="station-specialities" element={<StationSpecialities />} />
                    <Route path="industry-associate" element={<IndustryAssociate />} />
                    <Route path='tourist-helpline' element={<TouristHelpline />} />
                    <Route path='govt-scheme' element={<GovtScheme />} />
                    <Route path='investment-opportunities' element={<InvestmentOpportunity />} />

                    {/* Catch-all inside configuration */}
                    <Route path="*" element={<ErrorPage />} />
                </Route>
                <Route path='destinations' element={<Destination />} />
                <Route path='add-assets/:id' element={<StationAssetsList/>} />
                {/* Catch-all inside admin */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default StationRoutes