import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./page-header.module.scss";

interface IPageHeaderComponent {
  title: string;
  hasReturn?: boolean;
  hasTwoButtons?: boolean;
  route?: string;
  children?: any;
  list: string[];
  onSelect: (value: string) => void;
  onClick?: () => void;
}
export const PageHeaderComponent = (props: IPageHeaderComponent) => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentSelection, setCurrentSelection] = React.useState("");
  const onSelect = (value: string) => {
    props.onSelect(value);
    setCurrentSelection(value);
  };

  return (
    <div className={style["page-header"]}>
      <h2
        style={props.hasReturn ? { cursor: "pointer" } : {}}
        onClick={() =>
          props.hasReturn && props.route && navigate("/" + props.route)
        }
      >
        {props.hasReturn && <ReactSVG src="/icons/arrow-down.svg" />}
        {props.title}
      </h2>
      <div>
        {props.hasTwoButtons && (
          <ButtonComponent
            title={
              pathname.includes("/sessions/") && props.list
                ? "Edit session"
                : "Filter"
            }
            icon="/icons/settings.svg"
            hasBorder
            onClick={props.onClick}
          />
        )}
        {props.list.length > 0 && (
          <DropdownComponent
            title={
              currentSelection
                ? currentSelection
                : pathname.includes("/sessions/") && props.list
                ? props.list[0]
                : "Filter"
            }
            icon="/icons/filter.svg"
            hasBorder
          >
            <ul>
              {!pathname.includes("/sessions/") && (
                <li onClick={() => onSelect("")}>All</li>
              )}
              {props.list.map((value, key) => (
                <li key={key} onClick={() => onSelect(value)}>
                  {value}
                </li>
              ))}
            </ul>
          </DropdownComponent>
        )}
      </div>
    </div>
  );
};
