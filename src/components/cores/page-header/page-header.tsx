import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./page-header.module.scss";

interface IPageHeaderComponent {
  title: string;
  hasReturn?: boolean;
  route?: string;
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
        <DropdownComponent title="Athlete" hasBorder>
          <ul>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </DropdownComponent>
        <ButtonComponent title="Filter" icon="/icons/filter.svg" hasBorder />
      </div>
    </div>
  );
};
