import { ISession } from "../types/modules/session";

export const sortColumn =(list:ISession[],column:string,isAscending:boolean)=>{
    if (column !== null) {
    let result = list.sort((a: any, b: any) => {
        if (a[column] < b[column]) {
          return isAscending? 1 : -1;
        }
        if (a[column] > b[column]) {
          return !isAscending ? 1 : -1;
        }
        return 0;
      });
      return result;
    }
}