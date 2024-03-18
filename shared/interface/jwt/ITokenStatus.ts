import ICustomJWTPayload from "./ICustomPayload";

/**
 * JWT의 상태
 * ```typescript
 * interface ITokenStatus {
 *  status: string;
 *  mesage: string;
 *  payload: ICustomJWTPayload;
 * }
 * ```
 * @see {@link ICustomJWTPayload}
 */
export default interface ITokenStatus {
    status: string;
    message: string;
    payload: ICustomJWTPayload;
}