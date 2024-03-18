import IUser from "./IUser";

export default interface IUserInfo extends IUser {
    [key: string] : any
}