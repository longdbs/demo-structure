import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatDate } from "../utils/formatDate";
import GradientButton from "../shared/GradientButton";
import { ThemeContext } from "../context/ThemeContext";
import useWindowSize from "../hooks/useWindowSize";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { toggleTheme } = useContext(ThemeContext);
  const { height, width } = useWindowSize();
  return (
    <div>
      <Header />
      <main style={{ padding: "24px" }}>
        <p>{formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")}</p>
        {children}
        <div>
          <h1>Kích thước cửa sổ:</h1>
          <p>Chiều rộng: {width}px</p>
          <p>Chiều cao: {height}px</p>
        </div>
        <GradientButton text="Change theme" onClick={toggleTheme} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
