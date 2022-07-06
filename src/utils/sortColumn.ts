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
  columnName: string,
  columnParam: string,
  isAscending: boolean
) => {
  if (columnName !== null) {
    if (columnName === "mood") {
      return sortTrend(list, isAscending);
    } else {
      let result = list.sort((a: any, b: any) => {
        if (isAscending) {
          if (columnParam.length > 0) {
            return a[columnParam] < b[columnParam] ? -1 : 1;
          } else {
            return a[columnName] < b[columnName] ? -1 : 1;
          }
        } else {
          if (columnParam.length > 0) {
            return a[columnParam] > b[columnParam] ? -1 : 1;
          } else {
            return a[columnName] > b[columnName] ? -1 : 1;
          }
        }
      });
      return result;
    }
  }
};
