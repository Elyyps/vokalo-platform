import React from "react";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import style from "./dropdown.module.scss";

export interface IDropdownComponent {
  title?: string;
  icon?: string;
  isProfile?: boolean;
  hasNoPadding?: boolean;
  hasBorder?: boolean;
  contentPosition?: "right" | "left";
  variant?: "transparent" | "disabled";
  children: any;
  onClick?: () => void;
}
export const DropdownComponent = (props: IDropdownComponent) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const wrapperRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, props, wrapperRef]);

  return (
    <div className={style["dropdown"]} ref={wrapperRef}>
      {props.isProfile ? (
        <div
          className={style["dropdown-profile"]}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{props.title && props.title.charAt(0).toUpperCase()}</span>
          <ReactSVG
            src="/icons/arrow-down.svg"
            className={style[isOpen ? "open" : ""]}
          />
        </div>
      ) : (
        <div className={style[isOpen && !props.icon ? "open" : ""]}>
          <ButtonComponent
            title={props.title}
            icon={props.icon}
            variant={props.variant}
            onClick={() => setIsOpen(!isOpen)}
            isDropdown
            hasBorder={props.hasBorder}
          />
        </div>
      )}
      <div
        className={` ${style["dropdown-content"]} ${
          isOpen && style["dropdown-content-open"]
        }`}
        style={
          props.contentPosition === "right"
            ? {
                top: !props.title ? "25px" : "45px",
                right: "auto",
                left: "0px",
                padding: props.hasNoPadding ? 0 : "16px",
              }
            : {
                padding: props.hasNoPadding ? 0 : "16px",
                top: !props.title ? "25px" : "45px",
              }
        }
      >
        {props.children}
      </div>
    </div>
  );
};
