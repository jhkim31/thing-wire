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
const getMembersInOrg_1 = __importDefault(require("./getMembersInOrg"));
const getUser_1 = __importDefault(require("./getUser"));
const verifyUser_1 = __importDefault(require("./verifyUser"));
/**
 * User Data Access Layer
 * @method verifyUser
 * @method getUser
 * @method getMembersInOrg
 *
 */
class UserDal {
    /**
     * id와 pw를 받아 rdb의 유저를 검증하는 메소드
     *
     * @param userId
     * @param userPw
     * @returns {User} user
     *
     * @throws {InvalidError}
     */
    static verifyUser(userId, userPw) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, verifyUser_1.default)(userId, userPw);
        });
    }
    /**
     * userId를 받아 유저를 리턴하는 메소드
     *
     * @param userId
     * @returns {User} user
     *
     * @throws {InvalidError}
     */
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUser_1.default)(userId);
        });
    }
    /**
     * 특정 조직에 속한 유저들 리턴.
     * @param userId
     * @returns
     */
    static getMembersInOrg(orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getMembersInOrg_1.default)(orgId);
        });
    }
}
exports.default = UserDal;
//# sourceMappingURL=index.js.map