"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 유저 정보를 이용해 JWT 토큰을 생성합니다.
 */
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER;
assert_1.default.strictEqual(typeof TOKEN_SECRET_KEY, "string", "TOKEN_SECRET_KEY (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof TOKEN_EXPIRE_TIME, "string", "TOKEN_EXPIRE_TIME (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof TOKEN_ISSUER, "string", "TOKEN_ISSUER (이)가 선언되지 않았습니다.");
/**
 * User 정보를 payload로 넣어 jwt 를 발행합니다.
 *
 * @param user
 * @returns
 */
function createToken(user) {
    const token = jsonwebtoken_1.default.sign({
        type: "JWT",
        name: user.name,
        id: user.id,
    }, TOKEN_SECRET_KEY, {
        expiresIn: TOKEN_EXPIRE_TIME,
        issuer: TOKEN_ISSUER,
    });
    return token;
}
exports.default = createToken;
//# sourceMappingURL=createToken.js.map