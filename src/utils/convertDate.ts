export const converToDate = (date: string) => {
  const result = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const day = new Date(date).getDate();
  const addition = day === 1 ? "st" : day === 2 ? "nd" : "th";
  return result + addition;
};
