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
const group_1 = __importDefault(require("src/express/dals/group"));
const dateToLocaleString_1 = __importDefault(require("shared/lib/dateToLocaleString"));
function getOrganizationGroupsDetail(orgId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const tableHeader = ["name", "id", "created at", "devices"];
        const tableBody = [];
        const groups = yield group_1.default.getOrganizationGroups(orgId);
        for (const group of groups) {
            const t = {};
            t["name"] = group.name;
            t["id"] = group.id;
            t["created at"] = (0, dateToLocaleString_1.default)(group.createdAt);
            t["devices"] = `${(_b = (_a = group.devices) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0}`;
            tableBody.push(t);
        }
        return { tableHeader, tableBody };
    });
}
exports.default = getOrganizationGroupsDetail;
//# sourceMappingURL=getOrganizationGroupsDetail.js.map