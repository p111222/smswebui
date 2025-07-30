import React from "react";
import {Menu,MenuItem,ListItemIcon, ListItemText} from "@mui/material";

const MenuComponent = ({
  anchorEl,
  setAnchorEl,
  menuItems,
  handleItemClick
}) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={(e) => {
            handleItemClick(item.text);
            handleClose();
            e.stopPropagation()
          }}
        >
          {" "}
          <ListItemIcon>
            {item.icon} 
          </ListItemIcon>
          <ListItemText>
           <span className="text-[13px]">{item.text}</span>
          </ListItemText>{" "}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuComponent;
