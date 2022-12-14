import React from "react";
import style from "./tooltip.module.scss";

interface ITooltip {
  content: string;
}
export const Tooltip = ({ content }: ITooltip) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const wrapperRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, wrapperRef]);
  return (
    <span
      className={style["tooltip"]}
      ref={wrapperRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <small>i</small>
      {isOpen && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ minWidth: content.includes("<p>") ? "320px" : "220px" }}
        ></div>
      )}
    </span>
  );
};
