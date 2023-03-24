import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import style from "./menu-item.module.scss";

interface IMenuItemComponent {
  title: string;
  icon: string;
  route: string;
}

export const MenuItemComponent = (props: IMenuItemComponent) => {
  const { pathname } = useLocation();
  const path = pathname.replace("/", "");
  const route = props.route.replace("/", "");

  return (
    <Link
      to={props.route}
      className={` ${style["menu-item"]} ${
        route.length && path.startsWith(route) && style["active"]
      } `}
    >
      <ReactSVG src={props.icon} className={style["menu-item-icon"]} />
      <span>{props.title}</span>
    </Link>
  );
};
