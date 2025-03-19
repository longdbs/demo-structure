import {
  Box,
  Button,
  IconButton,
  ThemeProvider,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { drawerWidth } from "../consts/listCommon";
import { theme } from "../themes/theme";
import DrawerWrapper from "./Drawer/DrawerWrapper";
import { Logout, Menu as MenuIcon, Settings } from "@mui/icons-material";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <DrawerWrapper
        isMobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { lg: `${drawerWidth}px` },
          transition: "0.3s ease",
          height: "100%",
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
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
            variant="contained"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ borderRadius: 16 }}
          >
            Roy
          </Button>
        </Box>
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
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </MenuItem>
          <MenuItem>
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
