export type ISession = {
    date:string,
    type:"match" | "practice",
    length:number,
    coach:string,
    athletes:string[],
    recordings:boolean,
    analyzed:boolean
}
