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
const _logger_1 = __importDefault(require("@logger"));
function deleteOrg(userId, orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield index_1.default.transaction();
        try {
            const organization = yield models_1.Organization.findByPk(orgId, { include: [{ model: models_1.User, as: "owner" }], transaction });
            if (organization == null) {
                throw new Error_1.SequelizeError(`Organization 삭제 오류 : invalid orgId : ${orgId}`);
            }
            if (organization.ownerId == userId) {
                yield organization.destroy({ transaction });
                console.log('destroy!!');
            }
            else {
                throw new Error_1.SequelizeError(`자신이 owner인 조직만 삭제할 수 있습니다 : owner ${organization.ownerId} | userId : ${userId}`);
            }
            yield transaction.commit();
            _logger_1.default.trace(`org ${organization.name} 가 삭제되었습니다.`);
            return true;
        }
        catch (error) {
            yield transaction.rollback();
            throw error;
        }
    });
}
exports.default = deleteOrg;
//# sourceMappingURL=deleteOrg.js.map