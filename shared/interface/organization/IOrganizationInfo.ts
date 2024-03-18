import IOrganization from "./IOrganization";
export default interface IOrganizationInfo extends IOrganization {
    name: string,
    id: string,
    groups: string[],
    members: string[]

}