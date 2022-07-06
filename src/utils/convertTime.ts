export const converToHours = (minutes: number) => {
  return (
    `0${(minutes / 60) ^ 0}`.slice(-2) + "h" + ("0" + (minutes % 60)).slice(-2)
  );
};
export const converToMinutes = (value: number) => {
  const sec = value / 1000;
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec % 3600) / 60); // get minutes
  let seconds = Math.floor((sec % 3600) % 60);
  // return (
  //   `0${(sec / 60) ^ 0}`.slice(-2) + ":" + ("0" + (sec % 60)).slice(-2) + " min"
  // );
  console.log(minutes);
  return `${hours ? hours + "" : "0"}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};
