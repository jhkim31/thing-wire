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
const deleteGroup_1 = __importDefault(require("./deleteGroup"));
const getOrganizationGroups_1 = __importDefault(require("./getOrganizationGroups"));
const postGroup_1 = __importDefault(require("./postGroup"));
const getGroup_1 = __importDefault(require("./getGroup"));
const updateGroupSetting_1 = __importDefault(require("./updateGroupSetting"));
class GroupController {
    static getOrganizationGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, getOrganizationGroups_1.default)(req, res, next);
        });
    }
    static postGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, postGroup_1.default)(req, res, next);
        });
    }
    static deleteGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, deleteGroup_1.default)(req, res, next);
        });
    }
    static getGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, getGroup_1.default)(req, res, next);
        });
    }
    static updateGroupSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, updateGroupSetting_1.default)(req, res, next);
        });
    }
}
exports.default = GroupController;
//# sourceMappingURL=index.js.map