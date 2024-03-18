import IUser from "../user/IUser";

/**
 * Organization interface
 * 
 * ```typescript
 * interface IOrganization {
 *  id: string;
 *  name: string;
 *  owner?: IUser;
 * }
 * ```
 * 
 * @see {@link IUser}
 */
export default interface IOrganization {
    id: string;
    name: string;
    owner?: IUser
}