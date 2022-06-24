import React from "react";
import { useNavigate } from "react-router-dom";
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
}
export const PageHeaderComponent = (props: IPageHeaderComponent) => {
  let navigate = useNavigate();
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
          <ButtonComponent title="Filter" icon="/icons/filter.svg" hasBorder />
        )}
        <DropdownComponent title="Filter" icon="/icons/filter.svg" hasBorder>
          {props.children ? props.children : "hello"}
        </DropdownComponent>
      </div>
    </div>
  );
};
