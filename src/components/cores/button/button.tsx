import React from "react";
import { ReactSVG } from "react-svg";
import style from "./button.module.scss";

export interface IButtonComponent {
  title?: string;
  icon?: string;
  position?: "right" | "left" | "top";
  variant?: "transparent" | "secondary";
  isDropdown?: boolean;
  onClick?: () => void;
}
export const ButtonComponent = (props: IButtonComponent) => {
  const { variant, title, icon, position, isDropdown } = props;
  const returnIconPosition = (
    <React.Fragment>
      {(isDropdown || position !== "left") && title}
      <ReactSVG
        src={isDropdown && !icon ? "/icons/arrow-down.svg" : icon ? icon : ""}
        className={` ${variant !== "secondary" && style[`button-icon`]} ${
          style[`button-icon-${position}`]
        }`}
        style={!props.title ? { marginLeft: 0 } : {}}
      />
      {icon && position === "left" && title}
    </React.Fragment>
  );
  return (
    <div
      className={` ${style["button"]} ${!variant && style["button-default"]}  ${
        variant === "secondary" && style["button-secondary"]
      }`}
      style={!props.title ? { padding: 0, border: 0 } : {}}
      onClick={props.onClick}
    >
      {returnIconPosition}
    </div>
  );
};
