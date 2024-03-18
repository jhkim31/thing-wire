import BaseError from "./BaseError";

export default class AJVError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "AJVError";
    }
}