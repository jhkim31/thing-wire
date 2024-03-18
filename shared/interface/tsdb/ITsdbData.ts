export default interface ITsdbData {
    metric: string;
    tags: {
        [tag: string]: string 
    },
    aggregateTags: any[],
    dps: {
        [timestamp: string]: number
    }
}