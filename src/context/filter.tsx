import React from "react";

const team: any = {};
const startDate: Date = new Date();
const endDate: Date = new Date();

const setTeam = (value: any) => value;
const setStartEnd = (value: any) => value;
const setEndDate = (value: any) => value;

const FilterContext = React.createContext({
  team,
  startDate,
  endDate,
  setTeam,
  setStartEnd,
  setEndDate,
});

export const FilterContextProvider = (props: any) => {
  const [selectedTeam, setSelectedTeam] = React.useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date>(
    new Date()
  );
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
        setStartEnd: setSelectedStartDate,
        setEndDate: setSelectedEndDate,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
export default FilterContext;
