import BaseError from "./BaseError";

export default class TimeoutError extends BaseError {
    constructor(message: string){
        super(message);        
        this.name = "TimeoutError";
    }        
}