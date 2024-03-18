"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("shared/Error");
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const auth_1 = __importDefault(require("@services/auth"));
/**
 * 최초 로그인, 사용자의 계정정보를 보내고, JWT 토큰을 쿠키형태로 발급함.
 *
 * @throws {AuthenticationError}
 */
function postAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.header("Authorization");
        try {
            if (authorization == undefined) {
                throw new Error_1.AuthenticationError("인증 헤더가 비었습니다.");
            }
            const [authType, credentials] = authorization.split(" ");
            if (authType != "basic") {
                throw new Error_1.AuthenticationError(`인증 헤더 타입이 잘못되었습니다. "${authType}" is not basic`);
            }
            const token = yield auth_1.default.jwtLogin(credentials);
            res.cookie("Authorization", `bearer ${token}`, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            return res.status(200).json((0, createResponseMessage_1.default)("success", "login success", {}));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postAuth;
//# sourceMappingURL=postAuth.js.map