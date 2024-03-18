import assert from 'assert';
import jwt from 'jsonwebtoken';

import { User } from '@db/models';

/**
 * 유저 정보를 이용해 JWT 토큰을 생성합니다.
 */
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME as string;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER as string;

assert.strictEqual(typeof TOKEN_SECRET_KEY, "string", "TOKEN_SECRET_KEY (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof TOKEN_EXPIRE_TIME, "string", "TOKEN_EXPIRE_TIME (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof TOKEN_ISSUER, "string", "TOKEN_ISSUER (이)가 선언되지 않았습니다.");

/**
 * User 정보를 payload로 넣어 jwt 를 발행합니다.
 * 
 * @param user 
 * @returns 
 */
export default function createToken(user: User): string {
    const token = jwt.sign(
        {
            type: "JWT",
            name: user.name,
            id: user.id,
        },
        TOKEN_SECRET_KEY,
        {
            expiresIn: TOKEN_EXPIRE_TIME,
            issuer: TOKEN_ISSUER,
        }
    );

    return token;
}
