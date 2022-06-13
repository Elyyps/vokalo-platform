const sortTrend = (list: any[], isAscending: boolean) => {
  let newList = list.map((item) => {
    const itemCopy = { ...item };
    if (
      itemCopy.mood.trendDirection === "NEGATIVE" &&
      itemCopy.mood.trendLabel > 0
    ) {
      itemCopy.mood.trendLabel = -1 * itemCopy.mood.trendLabel;
    }
    return itemCopy;
  });
  return newList.sort((a: any, b: any) => {
    if (a.mood.trendLabel < b.mood.trendLabel) {
      return isAscending ? 1 : -1;
    }
    if (a.mood.trendLabel > b.mood.trendLabel) {
      return !isAscending ? 1 : -1;
    }
    return 0;
  });
};

export const sortColumn = (
  list: any[],
  column: string,
  isAscending: boolean
) => {
  if (column !== null) {
    if (column === "mood") {
      return sortTrend(list, isAscending);
    } else {
      let result = list.sort((a: any, b: any) => {
        if (a[column] < b[column]) {
          return isAscending ? 1 : -1;
        }
        if (a[column] > b[column]) {
          return !isAscending ? 1 : -1;
        }
        return 0;
      });
      return result;
    }
  }
};
