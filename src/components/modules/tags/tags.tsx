import React from "react";
import { ReactSVG } from "react-svg";
import { ITag } from "../../../types/cores/tag";
import { TagItemComponent } from "../../cores/tag-item/tag-item";
import style from "./tags.module.scss";
interface ITagsComponent {
  tags: ITag[];
}
export const TagsComponent = (props: ITagsComponent) => {
  return (
    <div className={style["tags"]}>
      <div className={style["tags-list"]}>
        {props.tags.map((tag, key) => (
          <TagItemComponent tag={tag} key={key} />
        ))}
      </div>
    </div>
  );
};
