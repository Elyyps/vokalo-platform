import React from "react";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./date-picker.module.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
interface IDateRange {
  endDate: Date;
  startDate: Date;
}
interface IDatePickerComponent {}

export const DatePickerComponent = (props: IDatePickerComponent) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = React.useState<IDateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const setDate = (range: any) => {
    setDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
    });
  };

  return (
    <div className={style["date-picker"]}>
      <DropdownComponent
        title="01/05/2022"
        icon="/icons/date.svg"
        onClick={() => setIsOpen(!isOpen)}
        hasNoPadding
        // contentPosition="right"
      >
        <div className={style["date-picker-content"]}>
          <div className={style["date-picker-content-top"]}>
            <DateRangePicker
              rangeColors={["#ee6c4d", "#5085f0"]}
              ranges={[dateRange]}
              onChange={(range) => setDate(range.range1)}
            />
          </div>
          <div className={style["date-picker-content-bottom"]}>
            <div>
              <span>match</span>
              <span>training</span>
            </div>
            <div>
              <ButtonComponent title="Cancel" variant="secondary" />
              <ButtonComponent title="Submit" variant="secondary" />
            </div>
          </div>
        </div>
      </DropdownComponent>
    </div>
  );
};
