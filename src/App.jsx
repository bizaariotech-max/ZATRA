
import { Route, Routes } from 'react-router-dom'
import WebsiteRoutes from './routes/WebsiteRoutes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminRoutes from './routes/AdminRoutes'
import StationRoutes from './routes/StationRoutes'
import DestinationRoutes from './routes/DestinationRoutes'

function App() {

  return (
    <Routes>
      {/* Auth routes - no WebsiteLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Website routes */}
      <Route path="/*" element={<WebsiteRoutes />} />

      {/* Dashboards */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/station-dashboard/*" element={<StationRoutes />} />
      <Route path="/destination-dashboard/*" element={<DestinationRoutes />} />


      {/*<Route path="/dashboard/*" element={<UserRoutes />} /> */}
    </Routes>
  )
}

export default App
