import React from "react";
import { converToMinutes } from "../../../utils/convertTime";
import { ButtonComponent } from "../../cores/button/button";
import style from "./tags.module.scss";
interface IAddTagsComponent {
  time: number;
}
export const AddTagsComponent = (props: IAddTagsComponent) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  return (
    <div className={style["tags"]}>
      {isOpen ? (
        <div className={style["tags-content"]}>
          <div className={style["tags-content-left"]}>
            <h6>
              Tag: <small>({converToMinutes(props.time)})</small>
            </h6>
            <textarea rows={4} />
          </div>
          <div className={style["tags-content-right"]}>
            <ButtonComponent
              title="Save"
              variant="secondary"
              onClick={() => setOpen(false)}
            />
            <ButtonComponent
              title="Cancel"
              variant="secondary"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      ) : (
        <ButtonComponent
          title="Add Tag"
          variant="secondary"
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
};
