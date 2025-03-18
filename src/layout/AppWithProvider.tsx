import React from "react";
import App from "../App";
import { ThemeProvider } from "../context/ThemeContext";

const AppWithProvider: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithProvider;
