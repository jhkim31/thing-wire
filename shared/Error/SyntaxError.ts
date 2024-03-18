import BaseError from "./BaseError";

export default class SyntaxError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "SyntaxError";
    }
}