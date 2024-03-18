import INotification from "./INotification"
export default interface INotificationInfo extends INotification {
    name: string,
    id: string
}