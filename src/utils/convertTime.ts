export const converTime =(minutes:number)=>{
    return  `0${minutes / 60 ^ 0}`.slice(-2) + 'h' + ('0' + minutes % 60).slice(-2)
}