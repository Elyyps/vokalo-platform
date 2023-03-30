import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
import { converToMinutes } from "../../../utils/convertTime";
import { ButtonComponent } from "../button/button";
import { ColorPickerComponent } from "../color-picker/color-picker";
import style from "./tag-item.module.scss";

interface ITagItemComponent {
  tag: ITag;
  onClick: (tag: ITag) => void;
  onEdit: (tag: ITag) => void;
  onDelete: (id: string) => void;
}

export const TagItemComponent = ({
  tag,
  onClick,
  onDelete,
  onEdit,
}: ITagItemComponent) => {
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>(tag.color);
  const [comment, setComment] = React.useState<string>(tag.comment);

  const onEditOpen = (tag: ITag) => {
    setColor(tag.color);
    setComment(tag.comment);
    setIsEdit(true);
  };
  return (
    <div className={` ${style["tag-item"]} widget-container`}>
      {!isEdit ? (
        <div style={{ minHeight: "35px" }}>
          <div className={style["tag-item-title"]}>
            <small>
              <b>{converToMinutes(tag.tagTime * 1000)}</b>
            </small>
            <span onClick={() => tag.tagTime > 0 && onClick(tag)}>
              <span
                className={style["tag-item-color"]}
                style={{ backgroundColor: tag.color }}
              />
              {tag.comment}
            </span>
          </div>
          <span className={style["tag-item-icons"]}>
            <ReactSVG src="/icons/export.svg" />
            <ReactSVG src="/icons/edit.svg" onClick={() => onEditOpen(tag)} />
            <ReactSVG
              src="/icons/delete.svg"
              onClick={() => setIsDelete(true)}
            />
          </span>
        </div>
      ) : (
        <div style={{ minHeight: "70px" }}>
          <small>
            <b>{converToMinutes(tag.tagTime * 1000)}</b>
          </small>
          <ColorPickerComponent color={color} onSelect={setColor} />
          <textarea
            rows={4}
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
          />
          <div className={style["tag-item-buttons"]}>
            <ButtonComponent
              title="Save"
              variant="secondary"
              onClick={() => {
                onEdit({ ...tag, color: color, comment: comment });
                setIsEdit(false);
              }}
            />
            <ButtonComponent
              title="Cancel"
              variant="secondary"
              onClick={() => setIsEdit(false)}
            />
          </div>
        </div>
      )}
      {isDelete && (
        <div className={style["tag-item-delete"]}>
          <div>
            <ButtonComponent
              title="Delete"
              variant="secondary"
              onClick={() => {
                onDelete(tag.id);
                setIsDelete(false);
              }}
            />
            <ButtonComponent
              title="Cancel"
              variant="secondary"
              onClick={() => setIsDelete(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
