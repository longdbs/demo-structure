import React from "react";
import styles from "../styles/GradientButton.module.css";

type GradientButtonProps = {
  text: string;
  onClick: () => void;
};

const GradientButton: React.FC<GradientButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.gradientButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default GradientButton;
