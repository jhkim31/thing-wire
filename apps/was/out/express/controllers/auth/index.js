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
const getUser_1 = __importDefault(require("./getUser"));
const postAuth_1 = __importDefault(require("./postAuth"));
const verifyAuth_1 = __importDefault(require("./verifyAuth"));
const verifyAuthPage_1 = __importDefault(require("./verifyAuthPage"));
/**
 * # Auth Controller
 * 인증과 관련된 Controller
 * ## Method
 * * postAuth : 인증 정보를 통해 인증을 시도 (성공시 jwt 토큰 제공)
 * * getUser : 사용자의 인증 정보를 제공
 * * verifyAuth : API 사용시, 사용자의 jwt 토큰 검증
 * * verifyAuthPage : 페이지 요청시, 사용자의 jwt 토큰 검증
 * * logout : 로그아웃
 */
class AuthController {
    static postAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, postAuth_1.default)(req, res, next);
        });
    }
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, getUser_1.default)(req, res, next);
        });
    }
    static verifyAuth(req, res, next) {
        (0, verifyAuth_1.default)(req, res, next);
    }
    static verifyAuthPage(req, res, next) {
        (0, verifyAuthPage_1.default)(req, res, next);
    }
    static logout(req, res) {
        res.clearCookie("Authorization");
        return res.status(302).redirect("/login");
    }
}
exports.default = AuthController;
//# sourceMappingURL=index.js.map