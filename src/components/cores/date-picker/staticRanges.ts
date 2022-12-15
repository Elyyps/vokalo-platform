import { addDays, addMonths, addYears, isSameDay } from "date-fns";

export const staticRanges = [
  {
    label: "Today",
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
    isSelected(range: any) {
      const definedRange: any = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Yesterday",
    range: () => ({
      startDate: addDays(new Date(), -1),
      endDate: addDays(new Date(), -1),
    }),
    isSelected(range: any) {
      const definedRange: any = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last Week",
    range: () => ({
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
    }),
    isSelected(range: any) {
      const definedRange: any = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last Month",
    range: () => ({
      startDate: addMonths(new Date(), -1),
      endDate: new Date(),
    }),
    isSelected(range: any) {
      const definedRange: any = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last Year",
    range: () => ({
      startDate: addYears(new Date(), -1),
      endDate: new Date(),
    }),
    isSelected(range: any) {
      const definedRange: any = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
];
