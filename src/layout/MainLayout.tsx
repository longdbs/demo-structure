import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { drawerWidth } from "../consts/listCommon";
import { theme } from "../themes/theme";
import DrawerWrapper from "./Drawer/DrawerWrapper";

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
          marginLeft: { sm: `${drawerWidth}px` },
          transition: "0.3s ease",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
