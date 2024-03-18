import {JwtPayload} from "jsonwebtoken";

/**
 * jwt 페이로드에 들어갈 커스텀 페이로드
 * ```typescript
 * interface ICustomJWTPayload {
 *  name: string;
 *  id: string;
 * }
 * ```
 */

export default interface ICustomJWTPayload extends JwtPayload {
    name: string;
    id: string;
}