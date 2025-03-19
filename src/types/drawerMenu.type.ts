import { JSX } from "react";

export interface DrawerMenuI {
  id: number;
  name: string;
  subList: SubMenuI[];
  icon?: JSX.Element;
}

export interface SubMenuI {
  id: number;
  name: string;
  icon?: JSX.Element;
}
