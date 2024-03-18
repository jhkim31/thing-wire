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
const deleteOrg_1 = __importDefault(require("./deleteOrg"));
const getUserJoinedOrgs_1 = __importDefault(require("./getUserJoinedOrgs"));
const postOrg_1 = __importDefault(require("./postOrg"));
const deleteOrgs_1 = __importDefault(require("./deleteOrgs"));
/**
 * Organization Data Access Layer
 * @method getUserJoinedOrgs
 * @method postOrg
 * @method deleteOrg
 *
 */
class OrgDal {
    static getUserJoinedOrgs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUserJoinedOrgs_1.default)(userId);
        });
    }
    static postOrg(orgId, orgName, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postOrg_1.default)(orgId, orgName, ownerId);
        });
    }
    static deleteOrg(userId, orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, deleteOrg_1.default)(userId, orgId);
        });
    }
    static deleteOrgs(userId, orgIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, deleteOrgs_1.default)(userId, orgIds);
        });
    }
}
exports.default = OrgDal;
//# sourceMappingURL=index.js.map