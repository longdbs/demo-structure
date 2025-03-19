import { Image, KeyboardVoiceRounded } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

function ConversationPage() {
  const [selected, setSelected] = useState("general");
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };
  return (
    <Grid2 container sx={{ height: "100%" }}>
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
              placeholder="Ask anything"
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
              variant="standard"
              disableUnderline
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
    </Grid2>
  );
}

export default ConversationPage;
