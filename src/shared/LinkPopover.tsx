import { Popover } from "@mui/material";

type LinkModalProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
  url: string;
};
export const LinkPopover = ({
  anchorEl,
  onClose,
  open,
  url,
}: LinkModalProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div style={{ padding: "10px", maxWidth: "300px" }}>
        <p>{`You hovered over or clicked on the link: ${url}`}</p>
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Visit link
          </a>
        </p>
      </div>
    </Popover>
  );
};
