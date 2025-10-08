import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'
import AdminSidedrawer from '../components/admin/AdminSidedrawer'

const AdminLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);


  ///=======Function to show hide drwaer on mobile========///
  const toggleShow = (value) => {
    setShow(value);
  };

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };


  return (
    <div className='flex h-screen'>
      <div className={`${collapsed ? "w-64" : "w-20"} overflow-y-auto hide-scrollbar bg-sidebar hidden  text-white md:flex flex-col  transition-all duration-300`}>
        <AdminSidebar show={collapsed} toggleDrawer={toggleDrawer} />
      </div>
      <AdminSidedrawer show={show} toggleShow={toggleShow} />
      <div className={`flex flex-col flex-1 transition-all duration-300`} style={{
        width: collapsed ? "calc(100% - 256px)" : "calc(100% - 80px)",
      }}>
        <AdminTopbar show={show} toggleShow={toggleShow} />
        <div className="h-[calc(100vh-70px)]  overflow-auto bg-foreground">
          {/* Render child route components here */}
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
