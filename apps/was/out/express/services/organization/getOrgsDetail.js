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
const dateToLocaleString_1 = __importDefault(require("shared/lib/dateToLocaleString"));
const organization_1 = __importDefault(require("src/express/dals/organization"));
function getOrgsDetail(userId) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        const orgs = yield organization_1.default.getUserJoinedOrgs(userId);
        const tableHeader = ["name", "id", "created at", "owner", "users", "groups", "devices", "roles",];
        const tableBody = [];
        for (const organization of orgs) {
            const orgInfo = {};
            orgInfo["name"] = organization.name;
            orgInfo["id"] = organization.id;
            orgInfo["created at"] = (0, dateToLocaleString_1.default)(organization.createdAt);
            orgInfo["owner"] = (_b = (_a = organization === null || organization === void 0 ? void 0 : organization.owner) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "-";
            orgInfo["users"] = `${(_d = (_c = organization === null || organization === void 0 ? void 0 : organization.users) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : -1}`;
            orgInfo["groups"] = `${(_f = (_e = organization === null || organization === void 0 ? void 0 : organization.groups) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : -1}`;
            orgInfo["devices"] = `${(_h = (_g = organization === null || organization === void 0 ? void 0 : organization.devices) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : -1}`;
            orgInfo["roles"] = `${(_k = (_j = organization === null || organization === void 0 ? void 0 : organization.roles) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : -1}`;
            tableBody.push(orgInfo);
        }
        return { tableHeader: tableHeader, tableBody: tableBody };
    });
}
exports.default = getOrgsDetail;
//# sourceMappingURL=getOrgsDetail.js.map