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
const index_1 = __importDefault(require("@db/index"));
const models_1 = require("@db/models");
function postOrg(orgId, orgName, ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield index_1.default.transaction();
        try {
            const organization = yield models_1.Organization.create({ id: orgId, name: orgName, ownerId: ownerId }, { transaction });
            if (organization == null) {
                throw new Error_1.SequelizeError(`[Organization 생성 오류] : orgId  ${orgId} | orgName  ${orgName} | ownerId  ${ownerId}`);
            }
            const association = yield models_1.UserOrg.create({ userId: ownerId, orgId: orgId }, { transaction });
            if (association == null) {
                throw new Error_1.SequelizeError(`Organization 생성 오류 : orgId : ${orgId} | orgName : ${orgName} | ownerId : ${ownerId}`);
            }
            yield transaction.commit();
            return organization;
        }
        catch (error) {
            yield transaction.rollback();
            if (error instanceof Error) {
                throw new Error_1.SequelizeError(`Sequelize Transaction Error ${error.message}`);
            }
            else {
                throw new Error_1.SequelizeError(`Sequelzie Transaction Error`);
            }
        }
    });
}
exports.default = postOrg;
//# sourceMappingURL=postOrg.js.map