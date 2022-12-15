import React from "react";
import { ButtonComponent } from "../button/button";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./date-picker.module.scss";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { convertDateToString } from "../../../utils/convertDate";
import { addYears, endOfYear, isSameDay, startOfYear } from "date-fns";
import { staticRanges } from "./staticRanges";

interface IDateRange {
  endDate: Date | undefined;
  startDate: Date | undefined;
}
interface IDatePickerComponent {
  contentPosition?: "right" | "left";
  dateRange: IDateRange;
  onChange: (dateRange: IDateRange) => void;
  onReset: () => void;
}

export const DatePickerComponent = (props: IDatePickerComponent) => {
  const [isClosed, setIsClosed] = React.useState<boolean>(false);
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = React.useState<IDateRange>({
    startDate: props.dateRange.startDate,
    endDate: props.dateRange.endDate,
  });
  const onSubmit = () => {
    setIsDefault(false);
    setIsClosed(true);
    props.onChange(dateRange);
  };
  const onReset = () => {
    setDateRange({
      startDate: new Date(),
      endDate: new Date(),
    });
    setIsDefault(true);
    setIsClosed(true);
    props.onReset();
  };

  const getTitle = () => {
    const start =
      dateRange.startDate &&
      "From: " + convertDateToString(dateRange.startDate);
    const end =
      dateRange.endDate && "To: " + convertDateToString(dateRange.endDate);

    if (dateRange && dateRange.endDate && dateRange.startDate && !isDefault) {
      return start + " " + end;
    } else {
      return "From: - To: -";
    }
  };

  return (
    <div className={style["date-picker"]}>
      <DropdownComponent
        title={getTitle()}
        icon="/icons/date.svg"
        isClosed={isClosed}
        onClick={() => setIsClosed(false)}
        contentPosition={props.contentPosition}
      >
        <div className={style["date-picker-content"]}>
          <div className={style["date-picker-content-top"]}>
            <DateRangePicker
              rangeColors={["#ee6c4d", "#5085f0"]}
              ranges={[dateRange]}
              staticRanges={staticRanges}
              onChange={(range: any) => setDateRange(range.range1)}
            />
          </div>
          <div className={style["date-picker-content-bottom"]}>
            <div>
              {/* <span>match</span>
              <span>training</span> */}
            </div>
            <div>
              <ButtonComponent
                title="Reset"
                variant="secondary"
                onClick={onReset}
              />
              <ButtonComponent
                title="Submit"
                variant="secondary"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </DropdownComponent>
    </div>
  );
};
