import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
import { converToMinutes } from "../../../utils/convertTime";
import { ButtonComponent } from "../button/button";
import { ColorPickerComponent } from "../color-picker/color-picker";
import style from "./tag-item.module.scss";
interface ITagItemComponent {
  tag: ITag;
}
export const TagItemComponent = ({ tag }: ITagItemComponent) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("#06f");
  return (
    <div className={` ${style["tag-item"]} widget-container`}>
      {!isEdit ? (
        <div style={{ minHeight: "35px" }}>
          <div className={style["tag-item-title"]}>
            <small>
              <b>{converToMinutes(tag.time * 1000)}</b>
            </small>
            <span>
              <span
                className={style["tag-item-color"]}
                style={{ backgroundColor: tag.color }}
              />
              {tag.content}
            </span>
          </div>
          <span className={style["tag-item-icons"]}>
            <ReactSVG src="/icons/export.svg" />
            <ReactSVG src="/icons/edit.svg" onClick={() => setIsEdit(true)} />
            <ReactSVG src="/icons/delete.svg" />
          </span>
        </div>
      ) : (
        <div style={{ minHeight: "70px" }}>
          <small>
            <b>{converToMinutes(tag.time)}</b>
          </small>
          <ColorPickerComponent color={tag.color} onSelect={setColor} />
          <textarea rows={4} value={tag.content} onChange={() => ""} />
          <div className={style["tag-item-buttons"]}>
            <ButtonComponent
              title="Save"
              variant="secondary"
              onClick={() => setIsEdit(false)}
            />
            <ButtonComponent
              title="Cancel"
              variant="secondary"
              onClick={() => setIsEdit(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
