import React from "react";
import { useLocation } from "react-router-dom";
import { ISidebar } from "../../../types/modules/sidebar";
import { MenuItemComponent } from "../../cores/menu-item/menu-item";
import style from "./sidebar.module.scss";

interface ISidebarComponent {
  sidebarModule: ISidebar;
}

export const SidebarComponent = ({ sidebarModule }: ISidebarComponent) => {
  const { pathname } = useLocation();

  return (
    <div className={` ${style["sidebar"]} container`}>
      <div className={style["sidebar-logo"]}>
        <img src="/logo.png" alt="vokalo logo" />
      </div>
      <ul className={style["sidebar-items"]}>
        {sidebarModule.items.map((item, key) => (
          <li key={key}>
            <MenuItemComponent {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
