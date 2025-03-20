import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const TypewriterEffect = ({ text }: { text: string }) => {
  const TypewriterText = styled(Typography)(({ theme }) => ({
    display: "inline-block",
    fontSize: "2rem",
    fontFamily: "'Courier New', Courier, monospace",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    wordWrap: "break-word",
    boxSizing: "border-box",

    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "0",
      width: "2px",
      height: "100%",
      backgroundColor: "black",
      animation: "blink 0.75s step-end infinite",
    },

    "@keyframes typing": {
      "0%": {
        clipPath: "inset(0 100% 0 0)",
      },
      "100%": {
        clipPath: "inset(0 0 0 0)",
      },
    },
    animation: "typing 4s steps(20) 1s 1 normal both",

    "@keyframes blink": {
      "50%": {
        backgroundColor: "transparent",
      },
    },
  }));

  return <TypewriterText variant="h4">{text}</TypewriterText>;
};

export default TypewriterEffect;
