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
const parseJsonString_1 = __importDefault(require("shared/lib/parseJsonString"));
const user_1 = __importDefault(require("src/express/dals/user"));
const _ajv_1 = __importDefault(require("@ajv"));
const _logger_1 = __importDefault(require("@logger"));
const jwt_1 = require("@middlewares/jwt");
/**
 * Base64로 인코딩된 유저 정보를 받아 jwt을 리턴한다.
 * @param userAuthCredentialsBase64
 * @returns jwt
 *
 * @throws {SyntaxError, }
 */
function jwtLogin(userAuthCredentialsBase64) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedAuthString = Buffer.from(userAuthCredentialsBase64, "base64").toString("utf-8");
        const validate = _ajv_1.default.getSchema("UserAuth");
        if (validate == undefined) {
            throw new Error_1.AJVError(`ajv get schema error : UserAuth`);
        }
        const userAuth = (0, parseJsonString_1.default)(decodedAuthString, validate);
        const id = userAuth.id;
        const pw = userAuth.pw;
        const user = yield user_1.default.verifyUser(id, pw);
        _logger_1.default.info(`로그인 성공 ${user.name}`);
        const token = (0, jwt_1.createToken)(user);
        return token;
    });
}
exports.default = jwtLogin;
//# sourceMappingURL=jwtLogin.js.map