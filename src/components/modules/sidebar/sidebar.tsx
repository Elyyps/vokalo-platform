import React from "react";
import { ReactSVG } from "react-svg";
import { ISidebar } from "../../../types/modules/sidebar";
import { MenuItemComponent } from "../../cores/menu-item/menu-item";
import style from "./sidebar.module.scss";

interface ISidebarComponent {
  sidebarModule: ISidebar;
}

export const SidebarComponent = ({ sidebarModule }: ISidebarComponent) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className={` ${style["sidebar"]} ${isOpen && style["sidebar-open"]}`}>
      <div className="container">
        <div className={style["sidebar-logo"]}>
          <img src="/img/logo.png" alt="vokalo logo" />
          <ReactSVG src="/icons/menu.svg" onClick={() => setIsOpen(!isOpen)} />
        </div>
        <div className={style["sidebar-items"]}>
          <ul>
            {sidebarModule.items.map((item, key) => (
              <li key={key} onClick={() => setIsOpen(!isOpen)}>
                <MenuItemComponent {...item} />
              </li>
            ))}
          </ul>
          <div>
            <img src="/img/logo.png" alt="vokalo logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
