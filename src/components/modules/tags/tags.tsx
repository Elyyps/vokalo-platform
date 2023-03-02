import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
import style from "./tags.module.scss";
interface ITagsComponent {
  tags: ITag[];
}
export const TagsComponent = (props: ITagsComponent) => {
  return (
    <div className={style["tags"]}>
      {props.tags.map((tag, key) => (
        <div className={` ${style["tags-item"]} widget-container`} key={key}>
          {tag.content}
          <span>
            <ReactSVG src="/icons/edit.svg" />
            <ReactSVG src="/icons/delete.svg" />
          </span>
        </div>
      ))}
    </div>
  );
};
