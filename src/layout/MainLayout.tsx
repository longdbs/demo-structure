import { Box, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { theme } from "../themes/theme";
import DrawerWrapper from "./Drawer/DrawerWrapper";
import { drawerWidth } from "../consts/listCommon";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <DrawerWrapper />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "",
          p: 3,
          marginLeft: { sm: `${drawerWidth}px` },
          transition: "0.3s ease",
          height: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
