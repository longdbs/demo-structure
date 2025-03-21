import { ChatBubbleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { drawerMenuList } from "../../consts/listCommon";
import DrawerMenuItem from "./DrawerMenuItem";
import logoCarelogix from "../../assets/logoCarelogix.png";
import { useConversation } from "../../context/ConversationContext";

function DrawerMenuList() {
  const { onResetConversation } = useConversation();
  return (
    <Box sx={{ width: 240 }} role="presentation">
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          alt="Carelogix"
          src={logoCarelogix}
          sx={{ width: 30, height: 30 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Carelogix
        </Typography>
      </Box>
      <List
        sx={{
          width: "calc(100% - 10px)",
          bgcolor: "background.paper",
          mb: 2,
          mx: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <ChatBubbleOutline />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} onClick={onResetConversation} dense>
            <ListItemText primary={`New chat`} />
          </ListItemButton>
        </ListItem>
      </List>

      <List
        sx={{
          width: "calc(100% - 10px)",
          bgcolor: "background.paper",
          mx: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "background.paper" }}
          >
            History
          </ListSubheader>
        }
      >
        {drawerMenuList?.map((menu) => (
          <DrawerMenuItem key={menu.id} menu={menu} />
        ))}
      </List>
    </Box>
  );
}

export default DrawerMenuList;
