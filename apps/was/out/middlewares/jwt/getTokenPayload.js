"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 향후 문제가 생길수도 있음.
 * 허나 지금은 verifyToken을 통과하면 문제가 없다고 가정하고 진행.
 * @param token
 * @returns
 */
function getTokenPayload(token) {
    var _a;
    const secret = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
}
exports.default = getTokenPayload;
//# sourceMappingURL=getTokenPayload.js.map