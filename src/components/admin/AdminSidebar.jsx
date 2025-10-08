import React, { useState } from "react";
import { Box, IconButton, Typography, Divider, Button, Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";
import useAdminSidebarLinks from "../../hooks/admin/useAdminSidebarLinks";
import Logo from '../../assets/images/logo-web.png'
// import { useAuth } from "../../context/AuthContext";
const AdminSidebar = ({ show, toggleDrawer }) => {
  const { pathname } = useLocation();
  // const { userDetails, logout } = useAuth();
  const links = useAdminSidebarLinks("Super Admin");
  const [openSubListId, setOpenSubListId] = useState(null);
  //=========== function to handle logout ===========\\
  const handleLogout = () => {
    // logout();
    toast.success("Logout successfully");
    window.location.href = "/";
  }

  return (
    <aside>
      {/* Logo */}
      <div className="flex items-center justify-center pt-14 pb-10">
        <Typography variant="h5" className="font-bold my-4 text-primary-foreground">
          {show ? <Avatar variant="rounded" alt="brand" src={Logo} sx={{ width: 64, height: 64, objectFit: "contain" }} /> : "ZATRA"}
        </Typography>
      </div>
      <Divider />
      <IconButton
        className="relative top-2 left-2 text-primary-foreground hidden md:block"
        id="toggle-icon-style"
        color="inherit"
        aria-label="toggle sidebar"
        onClick={toggleDrawer}
        edge="start"
        sx={{ mr: 2, position: 'absolute', top: 8, left: show ? 200 : 30, transition: 'left 0.3s' }}
      >
        {show ? <ChevronLeftIcon className="text-primary-foreground" /> : <MenuIcon className="text-primary-foreground" />}
      </IconButton>

      {/* Sidebar links */}
      <nav className="flex-1 space-y-2 ">
        <Box className="">
          {links?.map((item) => (
            <React.Fragment key={item.id}>
              {item.dock ? (

                <Link
                  to={item.link}
                  onClick={() => setOpenSubListId(null)}
                  className={`flex items-center rounded-md text-primary-foreground px-2 py-2 mt-1 mx-3 gap-3 mb-3 no-underline transition-all delay-100 duration-300 ease-in  hover:bg-sidebar-primary hover:text-white ${!show ? "collapsed" : ""
                    } ${pathname === item.link ? "bg-sidebar-primary text-white" : ""}`}
                >
                  <Box className={`flex items-center text-primary-foreground  hover:text-white gap-3 `}>
                    <span className="text-lg">
                      {item.icon}
                    </span>
                    {show && (
                      <Typography variant="body1">
                        <span className={`transition-all duration-300`}>{item.label}</span>
                      </Typography>
                    )}
                  </Box>
                </Link>
              ) : (
                <>
                  <span
                    onClick={() =>
                      setOpenSubListId(
                        openSubListId === item.id ? null : item.id
                      )
                    }
                    className={`mx-3 text-primary-foreground  no-underline py-2 px-2  mb-2 gap-3 hover:bg-sidebar-primary hover:text-white rounded-md transition-all delay-100 duration-300 ease-in-out  flex ${!show ? "collapsed" : ""
                      } ${pathname.startsWith(item.link) ? "bg-sidebar-primary text-white" : ""}`}
                  >
                    <Box className={`flex items-center text-primary-foreground ${pathname.startsWith(item.link) ? "text-white" : ""} hover:text-white gap-3`}>
                      <span className="text-lg">
                        {item.icon}
                      </span>
                      {show && (
                        <Typography variant="body1" className="flex-1">
                          <span className={`text-primary-foreground ${pathname.startsWith(item.link) ? "text-white" : ""} hover:text-white transition-all duration-300 ${pathname === item.link ? " text-white" : ""}`}>{item.label}</span>
                        </Typography>
                      )}
                      {show && (
                        <span className="ml-2">
                          {openSubListId === item.id ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </span>
                      )}
                    </Box>
                  </span>

                  {/* Sub menu */}
                  {show && openSubListId === item.id && (
                    <div className=" max-h-64 py-2 overflow-y-auto hide-scrollbar bg-sidebar-primary rounded-md mx-3">
                      {item?.subList?.map((subItem) => (
                        <Link
                          key={subItem?.id}
                          to={subItem?.path}
                          className={`mx-4 flex items-center rounded-md text-primary-foreground px-2 py-1 gap-3 mb-3 no-underline transition-all duration-300 ease-in hover:bg-sidebar-primary hover:text-white ${pathname === subItem.path ? "bg-sidebar-primary text-white" : ""
                            }`}
                        >
                          <Box className="sidebar-icon">
                            <span className="text-md">{subItem?.icon}</span>
                          </Box>
                          {show && (
                            <Typography variant="body2">
                              <span className="transition-all duration-300">{subItem?.title}</span>
                            </Typography>
                          )}
                        </Link>

                      ))}
                    </div>
                  )}

                </>
              )}
            </React.Fragment>
          ))}
        </Box>
      </nav>

      <Divider />
      <div className="p-4 text-center">
        {show ? <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--webprimary)",
            color: "white",
            border: "1px solid #CCE4F0 !important",
            "&:hover": {
              backgroundColor: "white",
              color: "#0077B5", // force override if needed
              border: "1px solid #CCE4F0 !important",
            },
          }}
          className="w-full transition-all duration-300 ease-in"
          onClick={handleLogout}
        >
          Logout
        </Button>
          : <IconButton
            className="text-primary-foreground transition-all duration-300 ease-in"
            aria-label="toggle sidebar"
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "var(--webprimary)",
              color: "white",
              border: "1px solid #CCE4F0 !important",
              "&:hover": {
                backgroundColor: "white",
                color: "#0077B5", // force override if needed
                border: "1px solid #CCE4F0 !important",
              },
            }}
          >
            <LogoutIcon />
          </IconButton>}

      </div>
    </aside>
  )
}

export default AdminSidebar
