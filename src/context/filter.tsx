import React from "react";

let team: any;
let startDate: Date | undefined;
let endDate: Date | undefined;

const setTeam = (value: any) => value;
const setStartDate = (value: any) => value;
const setEndDate = (value: any) => value;

const FilterContext = React.createContext({
  team,
  startDate,
  endDate,
  setTeam,
  setStartDate,
  setEndDate,
});

export const FilterContextProvider = (props: any) => {
  let threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const [selectedTeam, setSelectedTeam] = React.useState<string>("");
  const [selectedStartDate, setSelectedStartDate] =
    React.useState<Date>(threeMonthsAgo);
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(
    new Date()
  );
  return (
    <FilterContext.Provider
      value={{
        team: selectedTeam,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        setTeam: setSelectedTeam,
        setStartDate: setSelectedStartDate,
        setEndDate: setSelectedEndDate,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
export default FilterContext;
