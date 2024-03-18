import assert from 'assert';
import jwt from 'jsonwebtoken';
import { InvalidTokenError } from 'shared/Error';
import ICustomJWTPayload from 'shared/interface/jwt/ICustomPayload';
import dateToLocaleString from 'shared/lib/dateToLocaleString';

import logger from '@logger';

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;
assert.strictEqual(typeof TOKEN_SECRET_KEY, "string", "TOKEN_SECRET_KEY (이)가 선언되지 않았습니다.");

/**
 * 토큰이 정당한 토큰인지 확인.
 * @param token
 * 
 * @throws {InvalidTokenError}
 */

export default function verifyToken(token: string): ICustomJWTPayload {    
    const payload = jwt.verify(token, TOKEN_SECRET_KEY) as ICustomJWTPayload;
    const currentTime = Math.floor(new Date().getTime() / 1000);
    
    if (currentTime < (payload.exp ?? 0)) {
        return payload;
    } else {
        logger.trace(`Verify Token : [Invalid Token] ${token}`);
        throw new InvalidTokenError(`Expired Token | token-exp : ${dateToLocaleString(new Date((payload.exp ?? 0) * 1000))}`);        
    }
}
