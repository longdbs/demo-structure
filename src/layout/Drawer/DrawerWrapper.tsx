import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { drawerWidth } from "../../consts/listCommon";
import DrawerMenuList from "./DrawerMenuList";

export default function DrawerWrapper() {
  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={true}
        onClose={() => {}}
        onOpen={() => {}}
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "background-color 0.3s ease",
            overflowX: "hidden",
            height: "100vh",
            bgcolor: "#F8F8F8",
          },
        }}
      >
        <DrawerMenuList />
      </SwipeableDrawer>
    </div>
  );
}
