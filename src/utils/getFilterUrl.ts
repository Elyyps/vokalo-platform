import { convertDateToString } from "./convertDate";

export const getFilterUrl = (
  team: string,
  startDate: Date,
  endDate: Date,
  filter: any
) => {
  let filtersList = team || startDate || endDate || filter.value ? "?" : "";
  filtersList = filtersList.concat(team ? "&team=" + team : "");
  filtersList = filtersList.concat(
    filter.value ? "&" + filter.key + "=" + filter.value : ""
  );
  filtersList = filtersList.concat(
    startDate ? "&from=" + convertDateToString(startDate) : ""
  );
  filtersList = filtersList.concat(
    endDate ? "&to=" + convertDateToString(endDate) : ""
  );
  return filtersList;
};
