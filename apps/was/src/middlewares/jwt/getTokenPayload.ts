import jwt from 'jsonwebtoken';
import ICustomJWTPayload from 'shared/interface/jwt/ICustomPayload';

/**
 * 향후 문제가 생길수도 있음.
 * 허나 지금은 verifyToken을 통과하면 문제가 없다고 가정하고 진행.
 * @param token
 * @returns
 */
export default function getTokenPayload(token: string): ICustomJWTPayload {
    const secret: jwt.Secret = process.env.TOKEN_SECRET_KEY ?? "";
    const payload = jwt.verify(token, secret) as ICustomJWTPayload;
    return payload;
}
