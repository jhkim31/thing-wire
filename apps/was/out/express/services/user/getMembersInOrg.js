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
const user_1 = __importDefault(require("src/express/dals/user"));
const _logger_1 = __importDefault(require("@logger"));
const parser_1 = require("@db/parser");
/**
 * 특정 Organization에 속한 유저 리스트를 IUser 형태로 제공.
 * @param userId
 * @param orgId
 * @returns
 */
function getMembersInOrg(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_1.default.getMembersInOrg(orgId);
        const userInfos = users.map(user => (0, parser_1.UserParser)(user));
        _logger_1.default.trace(`orgId : ${orgId} 에 속한 유저들\n${JSON.stringify(userInfos, null, 4)}`);
        return userInfos;
    });
}
exports.default = getMembersInOrg;
//# sourceMappingURL=getMembersInOrg.js.map