import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ConversationPage from "./pages/ConversationPage";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useAuth();
  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        height: "100vh",
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                {!!username ? <ConversationPage /> : <LoginPage />}
              </MainLayout>
            }
          />
          <Route
            path="/conversation"
            element={
              <MainLayout>
                <ConversationPage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
