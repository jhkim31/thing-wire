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
const jwt_1 = require("@middlewares/jwt");
const user_1 = __importDefault(require("@services/user"));
/**
 * 현재 로그인한 유저의 정보를 가져온다.
 * @param req
 * @param res
 * @param next
 * @returns
 */
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.cookies.Authorization;
        try {
            if (authorization == undefined) {
                throw new Error_1.InvalidError("인증 헤더가 비었습니다.");
            }
            const [authType, token] = authorization.split(" ");
            if (authType != "bearer" || !token) {
                throw new Error_1.InvalidError(`인증 헤더 타입이 잘못되었습니다. "${authType}" is not bearer`);
            }
            const tokenPayload = (0, jwt_1.verifyToken)(token);
            const user = yield user_1.default.getUser(tokenPayload.id);
            return res.status(200).json((0, createResponseMessage_1.default)("success", "get auth success", user));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getUser;
//# sourceMappingURL=getUser.js.map