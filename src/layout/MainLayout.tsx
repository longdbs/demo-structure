import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../themes/theme";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ p: "24px" }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
