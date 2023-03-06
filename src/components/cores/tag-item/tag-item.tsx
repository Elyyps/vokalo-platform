import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
import { converToMinutes } from "../../../utils/convertTime";
import { ButtonComponent } from "../button/button";
import style from "./tag-item.module.scss";
interface ITagItemComponent {
  tag: ITag;
}
export const TagItemComponent = ({ tag }: ITagItemComponent) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  return (
    <div className={` ${style["tag-item"]} widget-container`}>
      {!isEdit ? (
        <div style={{ minHeight: "35px" }}>
          <div>
            <small>
              <b>{converToMinutes(tag.time * 1000)}</b>
            </small>
            {tag.content}
          </div>
          <span>
            <ReactSVG src="/icons/edit.svg" onClick={() => setIsEdit(true)} />
            <ReactSVG src="/icons/delete.svg" />
          </span>
        </div>
      ) : (
        <div style={{ minHeight: "70px" }}>
          <small>
            <b>{converToMinutes(tag.time)}</b>
          </small>
          <textarea rows={4} value={tag.content} onChange={() => ""} />
          <div>
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
