import React from "react";

let isCoach: boolean = false;
const setIsCoach = (isCoach: boolean) => {};

const CoachContext = React.createContext({
  isCoach,
  setIsCoach,
});

export const CoachContextProvider = (props: any) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  return (
    <CoachContext.Provider
      value={{
        isCoach: isActive,
        setIsCoach: setIsActive,
      }}
    >
      {props.children}
    </CoachContext.Provider>
  );
};
export default CoachContext;
