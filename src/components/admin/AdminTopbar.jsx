import React, { useState } from 'react';
import languageIcon from "../../assets/images/svg/language.svg"
import '../../assets/styles/Admin/admincss/adminheader.css'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bell, Mail, Menu, Search, } from 'lucide-react';
import { Avatar } from '@mui/material';
// import { useAuth } from '../../context/AuthContext';


const AdminTopbar = ({ show, toggleShow }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const {userDetails} = useAuth();
  return (
    <header className="app-topbar bg-white border-b border-gray-100 flex items-center py-3 px-4 justify-between shadow-md">
      <div className='flex justify-between w-full'>

        <div className="hidden md:flex items-center gap-3 w-1/3">
          <div className="flex items-center w-full max-w-md rounded-[12px] overflow-hidden bg-websecondary">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-4 py-1  text-webprimary outline-none bg-transparent"
            />
            <button className="bg-[#0077B5]/70 hover:bg-webprimary transition-colors  flex items-center justify-center search-btn-style">
              <Search className="text-white" size={25} />
            </button>
          </div>
        </div>
        <Menu onClick={toggleShow} className="md:hidden" />

        <div className="flex items-center space-x-6 pe-lg-5">
          <div className="items-center space-x-1 hidden lg:flex cursor-pointer language-input">
            <img src={languageIcon} alt="translate" className="w-5 me-2" />
            <span className="text-sm text-gray-700">English</span>
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="relative hidden lg:block cursor-pointer">
            <Bell className='text-muted-foreground' />
            <span className="absolute -top-1 -right-1 bg-webprimary text-white text-xs rounded-full px-1">1</span>
          </div>
          <div className="relative hidden lg:block cursor-pointer">
            <Mail className='text-muted-foreground' />
            <span className="absolute -top-1 -right-1 bg-webprimary text-white text-xs rounded-full px-1">5</span>
          </div>
          <div className="h-6 border-l border-gray-300 hidden lg:block"></div>
          <div className="items-center space-x-2 cursor-pointer hidden lg:flex">
            <Avatar alt="profile" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-primary">Hello, Super Admin</span>
              {/* <span className="text-xs text-muted-foreground">Doctor</span> */}
            </div>
          </div>
          {/* mobile view  profile and settings icon */}
          <div className="flex cursor-pointer md:hidden items-center relative">
            <Search className="text-accent-foreground" />
            <div
              className="flex items-center justify-center w-6 h-6 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)} // toggle dropdown
            >

              <MoreVertIcon
                sx={{ cursor: "pointer" }}
                className="h-100 w-100 text-accent-foreground"
              />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute top-8 right-0 bg-white dropdown-menu border-0 rounded-3 z-50"
                style={{
                  boxShadow:
                    "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                }}
              >
                <div className="d-flex flex-column align-items-start p-3">
                  <div className="items-center space-x-2 cursor-pointer flex lg:hidden mt-3 mb-2">
                    <Avatar alt="profile" className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-md font-semibold text-primary">Hello, Super Admin</span>
                      {/* <span className="text-xs text-muted-foreground">Doctor</span> */}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative block lg:hidden cursor-pointer mt-3 ">
                      <Bell className="text-muted-foreground" />
                      <span className="absolute -top-1 -right-1 bg-webprimary text-white text-xs rounded-full px-1">1</span>
                    </div>
                    <span className="ms-4 relative text-muted-foreground">Notifications</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative block lg:hidden cursor-pointer my-3">
                      <Mail className="text-muted-foreground" />
                      <span className="absolute -top-1 -right-1 bg-webprimary text-white text-xs rounded-full px-1">5</span>
                    </div>
                    <span className="ms-4 text-muted-foreground">Mail</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* mobile view  profile and settings icon end */}
        </div>

      </div>
    </header>
  )
}

export default AdminTopbar
