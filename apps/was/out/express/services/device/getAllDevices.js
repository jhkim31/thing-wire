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
const device_1 = __importDefault(require("src/express/dals/device"));
const deviceTypeParser_1 = __importDefault(require("shared/lib/deviceTypeParser"));
function getAllDevices() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const tableHeader = ["name", "id", "type", "registed", "organizations", "comment"];
        const tableBody = [];
        const devices = yield device_1.default.getAllDevices();
        for (const device of devices) {
            const t = {};
            t["name"] = device.name;
            t["id"] = device.id;
            t["type"] = (0, deviceTypeParser_1.default)(device.type);
            t["registed"] = (0, dateToLocaleString_1.default)(device.createdAt);
            let orgStr = "";
            for (const organization of (_a = device === null || device === void 0 ? void 0 : device.organizations) !== null && _a !== void 0 ? _a : []) {
                orgStr += `${organization.name} | `;
            }
            t["organizations"] = orgStr;
            t["comment"] = (_b = device.comment) !== null && _b !== void 0 ? _b : "";
            tableBody.push(t);
        }
        return { tableHeader: tableHeader, tableBody: tableBody };
    });
}
exports.default = getAllDevices;
//# sourceMappingURL=getAllDevices.js.map