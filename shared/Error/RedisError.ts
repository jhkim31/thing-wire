import BaseError from "./BaseError";

export default class RedisError extends BaseError {
    constructor(message: string){
        super(message);        
        this.name = "RedisError";
    }        
}