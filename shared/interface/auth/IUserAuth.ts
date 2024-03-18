/**
 * User를 인증하기 위해 위해 필요한 정보
 * ```typescript
 * interface IUserAuth {
 *  id: string;
 *  name: string;
 * }
 * ```
 */
export default interface IUserAuth {
    id: string;
    pw: string;
}