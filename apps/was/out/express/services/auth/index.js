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
const jwt_1 = require("@middlewares/jwt");
const jwtLogin_1 = __importDefault(require("./jwtLogin"));
class AuthService {
    static jwtLogin(userAuthCredentialsBase64) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, jwtLogin_1.default)(userAuthCredentialsBase64);
        });
    }
    static getTokenPayload(token) {
        return (0, jwt_1.getTokenPayload)(token);
    }
}
exports.default = AuthService;
//# sourceMappingURL=index.js.map