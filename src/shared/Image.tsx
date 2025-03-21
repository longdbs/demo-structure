import React, { useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: string;
  onRemove?: () => void;
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  placeholder = "",
  onRemove,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleDelete = () => {
    setIsImageDeleted(true);
    onRemove?.();
  };

  if (isImageDeleted) {
    return null;
  }

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
      {!!onRemove && (
        <IconButton
          onClick={handleDelete}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ImageComponent;
