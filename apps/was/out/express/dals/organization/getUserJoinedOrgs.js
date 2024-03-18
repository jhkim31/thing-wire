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
 * user가 속한 모든 organization을 리턴.
 * @param userId
 * @returns
 */
function getUserJoinedOrgs(userId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({
            where: { id: userId },
            include: [
                {
                    model: models_1.Organization,
                    as: "orgs",
                    include: [
                        {
                            model: models_1.User,
                            as: "owner",
                            attributes: { exclude: ['password'] }
                        },
                        {
                            model: models_1.Group,
                            as: "groups",
                        },
                        {
                            model: models_1.User,
                            as: "users",
                            attributes: { exclude: ['password'] }
                        },
                        {
                            model: models_1.Device,
                            as: "devices",
                        },
                        {
                            model: models_1.Role,
                            as: "roles",
                        },
                    ],
                },
            ],
        });
        if (user == null) {
            throw new Error_1.BadRequestError(`Get User Joined Orgs 오류 : invalid user ${userId}`);
        }
        _logger_1.default.trace(`user : ${userId} 가 속한 모든 조직 : ${((_a = user.orgs) !== null && _a !== void 0 ? _a : []).map(org => org.name)}`);
        return (_b = user.orgs) !== null && _b !== void 0 ? _b : [];
    });
}
exports.default = getUserJoinedOrgs;
//# sourceMappingURL=getUserJoinedOrgs.js.map