export const converToHours = (minutes: number) => {
  return (
    `0${(minutes / 60) ^ 0}`.slice(-2) + "h" + ("0" + (minutes % 60)).slice(-2)
  );
};
export const converToMinutes = (seconds: number) => {
  return (
    `0${(seconds / 60) ^ 0}`.slice(-2) +
    ":" +
    ("0" + (seconds % 60)).slice(-2) +
    " min"
  );
};
