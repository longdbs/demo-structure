import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { drawerWidth } from "../consts/listCommon";
import { useAuth } from "../context/AuthContext";
import { theme } from "../themes/theme";
import DrawerWrapper from "./Drawer/DrawerWrapper";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const usernamePart = username?.split("@")[0];
  const formattedUsername = usernamePart
    ? usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1)
    : "";
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/", { replace: true });
  };
  return (
    <ThemeProvider theme={theme}>
      {!!username && (
        <DrawerWrapper
          isMobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: !!username ? { lg: `${drawerWidth}px` } : "0px",
          transition: "0.3s ease",
          height: "100%",
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
        {!!username && (
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between", lg: "flex-end" },
              p: 2,
            }}
          >
            <IconButton
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              variant="outlined"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ borderRadius: 16 }}
            >
              {formattedUsername?.split("@")[0]}
            </Button>
          </Box>
        )}
        <Box sx={{ height: "calc(100% - 80px)" }}>{children}</Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </ThemeProvider>
  );
};

export default MainLayout;
