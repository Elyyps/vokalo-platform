import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
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
        <div>
          {tag.content}
          <span>
            <ReactSVG src="/icons/edit.svg" onClick={() => setIsEdit(true)} />
            <ReactSVG src="/icons/delete.svg" />
          </span>
        </div>
      ) : (
        <div>
          <input type="text" value={tag.content} />

          <span>
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
          </span>
        </div>
      )}
    </div>
  );
};
