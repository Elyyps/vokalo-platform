import { ISidebar } from "../../../types/modules/sidebar";
import { MenuItemComponent } from "../../cores/menu-item/menu-item";
import style from "./sidebar.module.scss";

interface ISidebarComponent {
  sidebarModule: ISidebar;
}

export const SidebarComponent = ({ sidebarModule }: ISidebarComponent) => {
  return (
    <div className={` ${style["sidebar"]} container`}>
      <div className={style["sidebar-logo"]}>
        <img src="/img/logo.png" alt="vokalo logo" />
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
