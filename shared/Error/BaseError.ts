export default class BaseError extends Error {
    constructor(message: string){
        super(message);
    }

    toJSON(){
        return {
            name: this.name ?? "",
            message: this.message ?? ""
        }
    }
}