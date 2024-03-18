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
const getOrgs_1 = __importDefault(require("./getOrgs"));
const postOrg_1 = __importDefault(require("./postOrg"));
const deleteOrgs_1 = __importDefault(require("./deleteOrgs"));
/**
 * Org Controller
 *
 * ## Method
 * * postAuth
 * * getUser
 *
 */
class OrgController {
    static getOrgs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, getOrgs_1.default)(req, res, next);
        });
    }
    static postOrg(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, postOrg_1.default)(req, res, next);
        });
    }
    static deleteOrg(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, deleteOrg_1.default)(req, res, next);
        });
    }
    static deleteOrgs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, deleteOrgs_1.default)(req, res, next);
        });
    }
}
exports.default = OrgController;
//# sourceMappingURL=index.js.map