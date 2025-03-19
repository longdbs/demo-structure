import {
  Image,
  KeyboardVoiceRounded,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

function ConversationPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selected, setSelected] = useState("general");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };
  return (
    <Grid2 container sx={{ height: "100%" }}>
      <Box sx={{ textAlign: "right", width: "100%", p: 2 }}>
        <Button
          variant="contained"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ borderRadius: 16 }}
        >
          Dashboard
        </Button>
      </Box>
      <Grid2
        container
        sx={{
          alignSelf: "end",
          width: "80%",
          mx: "auto",
          mb: 6,
          bgcolor: "background.paper",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: 2,
            height: "auto",
          }}
        >
          <Box sx={{ maxHeight: "300px", overflow: "auto", width: "100%" }}>
            <TextField
              id="standard-multiline-static"
              multiline
              defaultValue="Default Value"
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
              sx={{ width: "100%", height: "auto" }}
            />
          </Box>
          <IconButton sx={{ alignSelf: "start" }}>
            <KeyboardVoiceRounded />
          </IconButton>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={selected}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="ndis">NDIS</MenuItem>
              <MenuItem value="agedCare">Aged care</MenuItem>
            </Select>
          </FormControl>
          <IconButton sx={{ alignSelf: "start" }}>
            <Image />
          </IconButton>
        </Grid2>
      </Grid2>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Grid2>
  );
}

export default ConversationPage;
