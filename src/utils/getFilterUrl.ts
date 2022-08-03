import { convertDateToString } from "./convertDate";

export const getFilterUrl = (
  team: string,
  startDate: Date,
  endDate: Date,
  filters: any | any[]
) => {
  let filtersList = team || startDate || endDate || filters ? "?" : "";
  filtersList = filtersList.concat(team ? "&team=" + team : "");
  if (Array.isArray(filters)) {
    filters.forEach((filter) => {
      return (filtersList = filtersList.concat(
        filter.value ? "&" + filter.key + "=" + filter.value : ""
      ));
    });
  } else {
    filtersList = filtersList.concat(
      filters.value ? "&" + filters.key + "=" + filters.value : ""
    );
  }
  filtersList = filtersList.concat(
    startDate ? "&from=" + convertDateToString(startDate) : ""
  );
  filtersList = filtersList.concat(
    endDate ? "&to=" + convertDateToString(endDate) : ""
  );
  return filtersList;
};
