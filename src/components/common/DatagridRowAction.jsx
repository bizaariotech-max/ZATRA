import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from '@mui/material';

const DatagridRowAction = ({ row, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls={open ? "actions-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ color: "gray" }} />
            </IconButton>

            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {

                        borderRadius: "12px",
                        boxShadow:
                            "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        if (onEdit) onEdit(row);
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        if (onDelete) onDelete(row);
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default React.memo(DatagridRowAction);