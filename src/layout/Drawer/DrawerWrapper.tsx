import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { drawerWidth } from "../../consts/listCommon";
import DrawerMenuList from "./DrawerMenuList";
type Props = {
  onDrawerToggle: () => void;
  isMobileOpen: boolean;
};
export default function DrawerWrapper({ onDrawerToggle, isMobileOpen }: Props) {
  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={true}
        onClose={() => {}}
        onOpen={() => {}}
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "background-color 0.3s ease",
            overflowX: "hidden",
            height: "100vh",
            bgcolor: "background.paper",
            border: "none",
          },
        }}
      >
        <DrawerMenuList />
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor={"left"}
        open={isMobileOpen}
        onClose={onDrawerToggle}
        onOpen={() => {}}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "background-color 0.3s ease",
            overflowX: "hidden",
            height: "100vh",
            bgcolor: "background.default",
            border: "none",
          },
        }}
      >
        <DrawerMenuList />
      </SwipeableDrawer>
    </div>
  );
}
