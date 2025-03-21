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
import { useConversation } from "../context/ConversationContext";
import { useDebounce } from "../hooks/useDebounce";
import ImageComponent from "../shared/Image";
import { LinkPopover } from "../shared/LinkPopover";
import TypeWriterEffect from "../shared/TypeWriterEffect";
import { renderLinksInText } from "../utils/renderLinksInText";

function ConversationPage() {
  const { onQAList, qaList } = useConversation();
  const [selected, setSelected] = useState("general");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const heightChatRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [heightChatbox, setHeightChatbox] = useState<number>(100);
  const debouncedKeyword = useDebounce(keyword, 500);
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    link: string
  ) => {
    setUrl(link);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
    }
  };
  const renderSelectedImage = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      return (
        <ImageComponent
          height={100}
          width={100}
          alt="Selected"
          src={imageUrl}
          onRemove={() => setSelectedImage(null)}
          objectFit="contain"
        />
      );
    }
    return null;
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setKeyword(value);
  };
  const handleScroll = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  useEffect(() => {
    if (qaList[qaList?.length - 1]?.type === "Q") {
      const lastQuestion = qaList[qaList.length - 1]?.content;
      if (lastQuestion) {
        onQAList({ type: "A", content: lastQuestion });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaList?.length]);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (heightChatRef.current) {
        setHeightChatbox(heightChatRef.current.offsetHeight);
      }
    });

    if (heightChatRef.current) {
      resizeObserver.observe(heightChatRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList]);

  useEffect(() => {
    if (heightChatRef.current) {
      const chatBoxHeight = heightChatRef.current.offsetHeight;
      setHeightChatbox(!keyword ? 100 : chatBoxHeight);
    }
  }, [qaList, keyword, selectedImage]);
  return (
    <React.Fragment>
      <Grid2
        container
        sx={{ height: "100%", flexDirection: "column", bgcolor: "#f8f8ee" }}
      >
        <Grid2
          sx={{
            height: `calc(100vh - ${heightChatbox + 150}px)`,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            gap: 2,
            px: 2,
          }}
        >
          <Box sx={{ width: { xs: "90%", lg: "50%" }, mx: "auto" }}>
            {qaList?.map((qa, i) => (
              <React.Fragment key={qa.type + i}>
                {qa.type === "Q" && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      width: { xs: "95%", sm: "90%", lg: "80%", xl: "65%" },
                      alignSelf: "center",
                      borderRadius: 4,
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: { xs: 0, lg: "12%", xl: "25%" },
                    }}
                  >
                    {qa?.image && qa?.image}
                    {qa.content}
                  </Box>
                )}
                {qa.type === "A" && (
                  <Box
                    sx={{
                      p: 2,
                      alignSelf: "start",
                      padding: "20px",
                      maxWidth: "90%",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      justifyContent: "center",
                      ...(qa.content &&
                        !qa.content.includes(" ") &&
                        !qa.content.includes("\n") && {
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }),
                    }}
                  >
                    {qaList[qaList.length - 1].type === "A" &&
                    qaList.length - 1 === i ? (
                      <TypeWriterEffect
                        text={qa?.content || ""}
                        onPopoverOpen={handlePopoverOpen}
                        onScroll={handleScroll}
                      />
                    ) : (
                      renderLinksInText(qa?.content || "", handlePopoverOpen)
                    )}
                  </Box>
                )}
              </React.Fragment>
            ))}
            <Box ref={messageEndRef} />
          </Box>
        </Grid2>
        <Grid2
          ref={heightChatRef}
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
            bgcolor: "background.default",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
            minHeight: heightChatbox,
          }}
        >
          {renderSelectedImage()}
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
                sx={{ width: "100%", height: "auto", whiteSpace: "pre-line" }}
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (keyword || selectedImage) {
                      const questionContent = keyword;
                      const imageContent = selectedImage ? (
                        <ImageComponent
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          width={100}
                          height={100}
                        />
                      ) : null;

                      onQAList({
                        type: "Q",
                        content: questionContent,
                        image: imageContent,
                      });
                      setKeyword("");
                      setSelectedImage(null);
                    }
                  }
                }}
              />
            </Box>
            <IconButton sx={{ alignSelf: "start", color: "text.primary" }}>
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
            <IconButton sx={{ alignSelf: "start", color: "text.primary" }}>
              <Box
                component="label"
                sx={{ cursor: "pointer" }}
                htmlFor="image-upload"
              >
                <Image />
              </Box>
            </IconButton>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <LinkPopover
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        open={open}
        url={url}
      />
    </React.Fragment>
  );
}

export default ConversationPage;
