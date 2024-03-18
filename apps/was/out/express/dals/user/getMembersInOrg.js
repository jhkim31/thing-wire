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
const models_1 = require("@db/models");
const _logger_1 = __importDefault(require("@logger"));
/**
 * 특정 org에 속한 Users 제공.
 * @param userId
 * @param orgId
 * @returns
 */
function getMembersInOrg(orgId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const organization = yield models_1.Organization.findByPk(orgId, {
            include: [
                {
                    model: models_1.User,
                    as: "users",
                    attributes: {
                        exclude: ['password']
                    }
                }
            ]
        });
        if (organization == null) {
            throw new Error_1.BadRequestError("일치하는 organization 없음");
        }
        const users = (_a = organization.users) !== null && _a !== void 0 ? _a : [];
        _logger_1.default.debug(`org : ${organization.name} 에 속한 users : ${users.length}명\n
    ${users.map(user => user.name)}`);
        return users;
    });
}
exports.default = getMembersInOrg;
//# sourceMappingURL=getMembersInOrg.js.map