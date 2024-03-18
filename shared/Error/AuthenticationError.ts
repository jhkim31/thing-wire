import BaseError from "./BaseError";

export default class AuthenticationError extends BaseError {
    constructor(message: string){
        super(message);
        this.name = "AuthenticationError";
    }
}