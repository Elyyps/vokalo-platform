import React from "react";
import { converToMinutes } from "../../../utils/convertTime";
import { ButtonComponent } from "../../cores/button/button";
import { ColorPickerComponent } from "../../cores/color-picker/color-picker";
import style from "./tags.module.scss";

interface IAddTagsComponent {
  time: number;
  onSave: (color: string, comment: string) => void;
  onClick: () => void;
}

export const AddTagsComponent = (props: IAddTagsComponent) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("#06f");
  const [comment, setComment] = React.useState<string>("");
  const clearInput = () => {
    setOpen(false);
    setColor("#06f");
    setComment("");
  };
  return (
    <div className={style["tags"]}>
      {isOpen ? (
        <div className={style["tags-content"]}>
          <div className={style["tags-content-left"]}>
            <h6>
              Tag: <small>({converToMinutes(props.time)})</small>
            </h6>
            <textarea
              rows={4}
              onChangeCapture={(e: any) => setComment(e.target.value)}
            />
          </div>
          <div className={style["tags-content-right"]}>
            <ColorPickerComponent color={color} onSelect={setColor} />
            <ButtonComponent
              title="Save"
              variant={comment && color ? "secondary" : "disabled"}
              onClick={() => {
                props.onSave(color, comment);
                clearInput();
              }}
            />
            <ButtonComponent
              title="Cancel"
              variant="secondary"
              onClick={clearInput}
            />
          </div>
        </div>
      ) : (
        <ButtonComponent
          title="Add Tag"
          variant={props.time > 0 ? "secondary" : "disabled"}
          onClick={() => {
            props.time > 0 && setOpen(true);
            props.time > 0 && props.onClick();
          }}
        />
      )}
    </div>
  );
};
