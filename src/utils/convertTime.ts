export const converToHours = (minutes: number) => {
  return (
    `0${(minutes / 60) ^ 0}`.slice(-2) + "h" + ("0" + (minutes % 60)).slice(-2)
  );
};
export const converToMinutes = (value: number) => {
  const sec = value / 1000;
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec % 3600) / 60);
  let seconds = Math.floor((sec % 3600) % 60);

  return `${hours ? hours + "" : "0"}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};
