import React from "react";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./color-picker.module.scss";

interface IColorPickerComponent {
  color: string;
  onSelect: (color: string) => void;
}
export const ColorPickerComponent = (props: IColorPickerComponent) => {
  return (
    <div className={style["color-picker"]}>
      <DropdownComponent
        variant="transparent"
        hasBorder
        isColor
        title={props.color}
      >
        <ul>
          <li onClick={() => props.onSelect("#ffffff")}>
            <span style={{ backgroundColor: "#ffffff" }} />
          </li>
          <li onClick={() => props.onSelect("#06f")}>
            <span style={{ backgroundColor: "#06f" }} />
          </li>
          <li onClick={() => props.onSelect("#21ce71")}>
            <span style={{ backgroundColor: "#21ce71" }} />
          </li>
          <li onClick={() => props.onSelect("#f05056")}>
            <span style={{ backgroundColor: "#f05056" }} />
          </li>
        </ul>
      </DropdownComponent>
    </div>
  );
};
