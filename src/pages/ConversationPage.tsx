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
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { QAI } from "../types/question.type";
import TypeWriterEffect from "../shared/TypeWriterEffect";

function ConversationPage() {
  const [selected, setSelected] = useState("general");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };
  const [keyword, setKeyword] = useState("");
  const [qaList, setQAList] = useState<QAI[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setKeyword(value);
  };
  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  useEffect(() => {
    if (qaList[qaList?.length - 1]?.type === "Q") {
      const lastQuestion = qaList[qaList.length - 1]?.content;
      if (lastQuestion) {
        setQAList((prev) => [...prev, { type: "A", content: lastQuestion }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaList?.length]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList]);

  return (
    <Grid2 container sx={{ height: "100%", flexDirection: "column" }}>
      <Grid2
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          gap: 2,
        }}
      >
        {qaList?.map((qa, i) => (
          <React.Fragment key={qa.type + i}>
            {qa.type === "Q" && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#D7DEEE",
                  width: "50%",
                  alignSelf: "end",
                  borderRadius: 4,
                }}
              >
                {qa.content}
              </Box>
            )}
            {qa.type === "A" && (
              <Box
                sx={{
                  p: 2,
                }}
                style={{
                  padding: "20px",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                }}
              >
                {qaList[qaList.length - 1].type === "A" &&
                qaList.length - 1 === i ? (
                  <TypeWriterEffect text={qa?.content || ""} />
                ) : (
                  qa?.content
                )}
              </Box>
            )}
          </React.Fragment>
        ))}
        <Box ref={messageEndRef} />
      </Grid2>
      <Grid2
        container
        sx={{
          alignSelf: "end",
          width: { xs: "90%", lg: "75%", xl: "80%" },
          transform: {
            xs: "translateX(-50%)",
            xl: "translateX(-50%)",
            "2xl": "translateX(-50%)",
          },
          mx: "auto",
          mb: 6,
          bgcolor: "background.paper",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          p: 2,
          position: "fixed",
          bottom: 0,
          left: {
            xs: "50%",
            lg: "calc(50% + 120px)",
          },
          right: "auto",
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
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setQAList((prev) => [
                    ...prev,
                    { type: "Q", content: keyword },
                  ]);
                  setKeyword("");
                }
              }}
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
