import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { DrawerMenuI } from "../../types/drawerMenu.type";
type Props = {
  menu: DrawerMenuI;
};
function DrawerMenuItem({ menu }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        {menu?.icon && <ListItemIcon>{menu?.icon}</ListItemIcon>}
        <ListItemText
          primary={
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {menu?.name || ""}
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu?.subList?.map((sub) => (
            <ListItemButton key={`sub-${sub.id}`} sx={{ pl: 4 }}>
              {sub?.icon && <ListItemIcon>{sub?.icon}</ListItemIcon>}
              <ListItemText primary={sub?.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default DrawerMenuItem;
