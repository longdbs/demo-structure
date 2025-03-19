import { DrawerMenuI } from "../types/drawerMenu.type";

export const drawerWidth = 240;
export const drawerMenuList: DrawerMenuI[] = [
  {
    id: 1,
    name: "Favorites",
    subList: [
      { id: 1, name: "NDIS & Aged care" },
      { id: 2, name: "Aged care" },
    ],
  },
  {
    id: 2,
    name: "Today",
    subList: [
      { id: 1, name: "Introduction Carelogix" },
      { id: 2, name: "Introduction Deltabrains" },
    ],
  },
  { id: 3, name: "Last 30 days", subList: [] },
];
