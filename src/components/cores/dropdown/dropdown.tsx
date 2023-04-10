import React from "react";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import style from "./dropdown.module.scss";

export interface IDropdownComponent {
  title?: string;
  icon?: string;
  isProfile?: boolean;
  hasPadding?: boolean;
  hasBorder?: boolean;
  isColor?: boolean;
  contentPosition?: "right" | "left" | "top";
  variant?: "transparent" | "disabled" | "admin";
  children: any;
  isClosed?: boolean;
  onClick?: (event: any) => void;
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
  React.useEffect(() => {
    if (props.isClosed) {
      setIsOpen(false);
    }
  }, [props.isClosed]);
  React.useEffect(() => {
    if (props.isClosed === undefined) setIsOpen(false);
  }, [props.title]);
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
        <div
          className={` ${style[isOpen && !props.icon ? "open" : ""]} ${
            props.variant === "admin" && style["dropdown-admin"]
          }`}
        >
          <ButtonComponent
            title={props.title}
            icon={props.icon}
            variant={props.variant}
            onClick={() => {
              setIsOpen(!isOpen);
              props.onClick && props.onClick(() => isOpen);
            }}
            isDropdown
            isColor={props.isColor}
            hasBorder={props.hasBorder}
          />
        </div>
      )}
      <div
        className={` ${style["dropdown-content"]} 
        ${props.isProfile && style["dropdown-content-profile"]}  
        ${isOpen && style["dropdown-content-open"]} ${
          props.contentPosition === "right" && style["dropdown-content-right"]
        }`}
        style={{
          padding: props.hasPadding ? "8px 12px" : 0,
          top:
            !props.title || props.isColor
              ? "25px"
              : props.contentPosition === "top"
              ? ""
              : "45px",
          bottom: props.contentPosition === "top" ? "35px" : "",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
