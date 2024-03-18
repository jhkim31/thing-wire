import BaseError from "./BaseError";

export default class InvalidError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "InvalidError";
    }
}