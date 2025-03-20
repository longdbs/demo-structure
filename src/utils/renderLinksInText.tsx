import { Button } from "@mui/material";

export const renderLinksInText = (
  text: string,
  onPopoverOpen: (event: React.MouseEvent<HTMLElement>, link: string) => void
) => {
  const urlRegex = /(\bhttps?:\/\/[^\s]+|www\.[^\s]+\b)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Button
          key={index}
          sx={{ color: "primary.dark" }}
          onClick={(e) => {
            onPopoverOpen(e, part);
          }}
        >
          {part}
        </Button>
      );
    }
    return part;
  });
};
