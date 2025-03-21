import React from "react";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";
import { ConversationProvider } from "../context/ConversationContext";
import { ThemeProvider } from "../context/ThemeContext";

const AppWithProvider: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <ConversationProvider>
        <App />
      </ConversationProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppWithProvider;
