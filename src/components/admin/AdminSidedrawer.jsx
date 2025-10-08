import * as React from "react";
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAdminSidebarLinks from "../../hooks/admin/useAdminSidebarLinks";
// import { useAuth } from "../../context/AuthContext";

const AdminSidedrawer = ({ show, toggleShow }) => {
    const [openMenu, setOpenMenu] = React.useState(null);
    const { pathname } = useLocation();
    // const { userDetails, logout } = useAuth();
    const links = useAdminSidebarLinks("Super Admin");

    const handleClick = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    //=========== function to handle logout ===========\\
    const handleLogout = () => {
        // logout();
        toast.success("Logout successfully");
        window.location.href = "/";
    }
    const DrawerList = (
        <Box
            className="bg-sidebar pt-8 text-white h-full overflow-auto"
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                {links.map((item) => (
                    <React.Fragment key={item?.id}>
                        {/* Top level item */}
                        <ListItem disablePadding>
                            <Link
                                to={item.link}
                                onClick={() =>
                                    item?.subList ? handleClick(item.id) : toggleShow(false)
                                }
                                className={`w-full flex items-center text-white transition-all duration-300 ease-in rounded 
                  hover:bg-sidebar-primary hover:text-white
                  ${pathname === item.link ? "bg-sidebar-primary text-white" : "text-primary"}`}
                            >
                                <ListItemButton>
                                    <span className="me-2">{item?.icon} </span>
                                    <ListItemText primary={item?.label} />
                                    {item?.subList &&
                                        (openMenu === item.id ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        ))}
                                </ListItemButton>
                            </Link>
                        </ListItem>

                        {/* Submenu */}
                        {item?.subList && (
                            <Collapse in={openMenu === item.id} timeout="auto" unmountOnExit>
                                <List component="div" className="bg-sidebar-foreground text-white max-h-64 overflow-y-auto hide-scrollbar py-3">
                                    {item.subList.map((child) => (
                                        <ListItem key={child.id} disablePadding className="px-8">
                                            <Link
                                                to={child.path}
                                                onClick={() => toggleShow(false)}
                                                className={`w-full text-white flex items-center transition-all duration-300 ease-in rounded 
                          hover:bg-sidebar-primary hover:text-white
                          ${pathname === child.path ? "bg-sidebar-primary text-white" : "text-primary"}`}
                                            >
                                                <ListItemButton>
                                                    <span className="me-2">{child.icon}</span>
                                                    <ListItemText primary={child.title} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Divider />
            <div className="p-4 mt-4 text-center">
                <Button
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
                    onClick={handleLogout}
                    className="w-full transition-all duration-300  ease-in"
                >
                    Logout
                </Button>

            </div>
        </Box>
    );

    return (
        <Drawer open={show} onClose={() => toggleShow(false)} >
            {DrawerList}
        </Drawer>
    );
};

export default AdminSidedrawer;
