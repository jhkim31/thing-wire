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
const parser_1 = require("@db/parser");
const device_1 = __importDefault(require("src/express/dals/device"));
function getGroupDevicesSimple(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield device_1.default.getGroupDevices(groupId);
        const deviceInfos = devices.map(device => (0, parser_1.DeviceParser)(device));
        return deviceInfos;
    });
}
exports.default = getGroupDevicesSimple;
//# sourceMappingURL=getGroupDevicesSimple.js.map