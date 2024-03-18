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
const device_1 = __importDefault(require("src/express/dals/device"));
function getOrganizationDevicesDetail(orgId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield device_1.default.getOrganizationDevices(orgId);
        const tableHeader = ["name", "id", "groups", "comment"];
        const tableBody = [];
        for (const device of devices) {
            const t = {};
            t["name"] = device.name;
            t["id"] = device.id;
            let orgStr = "";
            for (const group of (_a = device === null || device === void 0 ? void 0 : device.groups) !== null && _a !== void 0 ? _a : []) {
                orgStr += `${group.name} | `;
            }
            t["groups"] = orgStr;
            t["comment"] = (_b = device.comment) !== null && _b !== void 0 ? _b : "";
            tableBody.push(t);
        }
        return { tableHeader: tableHeader, tableBody: tableBody };
    });
}
exports.default = getOrganizationDevicesDetail;
//# sourceMappingURL=getOrganizationDevicesDetail.js.map