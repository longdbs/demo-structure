import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: string;
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  placeholder = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        width: width,
        height: height,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading && !placeholder && (
        <CircularProgress
          size={50}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {isLoading && placeholder && (
        <img
          src={placeholder}
          alt="Placeholder"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: objectFit,
          visibility: isLoading ? "hidden" : "visible",
          transition: "visibility 0s 0.5s",
        }}
      />
    </Box>
  );
};

export default ImageComponent;
