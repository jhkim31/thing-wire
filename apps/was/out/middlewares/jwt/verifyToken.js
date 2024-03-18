"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("shared/Error");
const dateToLocaleString_1 = __importDefault(require("shared/lib/dateToLocaleString"));
const _logger_1 = __importDefault(require("@logger"));
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
assert_1.default.strictEqual(typeof TOKEN_SECRET_KEY, "string", "TOKEN_SECRET_KEY (이)가 선언되지 않았습니다.");
/**
 * 토큰이 정당한 토큰인지 확인.
 * @param token
 *
 * @throws {InvalidTokenError}
 */
function verifyToken(token) {
    var _a, _b;
    const payload = jsonwebtoken_1.default.verify(token, TOKEN_SECRET_KEY);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (currentTime < ((_a = payload.exp) !== null && _a !== void 0 ? _a : 0)) {
        return payload;
    }
    else {
        _logger_1.default.trace(`Verify Token : [Invalid Token] ${token}`);
        throw new Error_1.InvalidTokenError(`Expired Token | token-exp : ${(0, dateToLocaleString_1.default)(new Date(((_b = payload.exp) !== null && _b !== void 0 ? _b : 0) * 1000))}`);
    }
}
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map