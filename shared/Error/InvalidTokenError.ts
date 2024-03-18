import BaseError from "./BaseError";

export default class InvalidTokenError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "InvalidTokenError";
    }
}