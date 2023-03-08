import React from "react";
import { ITag } from "../../../types/cores/tag";
import { TagItemComponent } from "../../cores/tag-item/tag-item";
import style from "./tags.module.scss";
interface ITagsComponent {
  tags: ITag[];
  onEdit: (tag: ITag) => void;
  onDelete: (id: string) => void;
}

export const TagsComponent = (props: ITagsComponent) => {
  return (
    <div className={style["tags"]}>
      <div className={style["tags-list"]}>
        {props.tags.map((tag, key) => (
          <TagItemComponent
            tag={tag}
            key={key}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        ))}
      </div>
    </div>
  );
};
