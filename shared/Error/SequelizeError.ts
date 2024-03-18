import BaseError from "./BaseError";

export default class SequelizeError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "SequelizeError";
    }
}