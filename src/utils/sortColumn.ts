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
const sortUsers = (list: any[], isAscending: boolean) => {
  let result = list.sort((a, b) => {
    if (a.firstName > b.firstName) {
      return isAscending ? 1 : -1;
    } else if (a.firstName < b.firstName) {
      return !isAscending ? 1 : -1;
    }
    if (a.lastName > b.lastName) {
      return isAscending ? 1 : -1;
    } else if (a.lastName < b.lastName) {
      return !isAscending ? 1 : -1;
    } else {
      return 0;
    }
  });
  return result;
};
export const sortColumn = (
  list: any[],
  columnName: string,
  columnParam: string[],
  isAscending: boolean
) => {
  if (columnName !== null) {
    if (columnName === "mood") {
      return sortTrend(list, isAscending);
    } else if (columnName === "name" || columnName === "coach") {
      return sortUsers(list, isAscending);
    } else {
      let result = list.sort((a: any, b: any) => {
        if (isAscending) {
          if (columnParam.length > 1) {
            return a[columnParam[0]][columnParam[1]] <
              b[columnParam[0]][columnParam[1]]
              ? -1
              : 1;
          } else {
            return a[columnParam[0]] < b[columnParam[0]] ? -1 : 1;
          }
        } else {
          if (columnParam.length > 1) {
            return a[columnParam[0]][columnParam[1]] >
              b[columnParam[0]][columnParam[1]]
              ? -1
              : 1;
          } else {
            return a[columnParam[0]] > b[columnParam[0]] ? -1 : 1;
          }
        }
      });
      return result;
    }
  }
};
