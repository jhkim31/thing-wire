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
const models_1 = require("@db/models");
const _logger_1 = __importDefault(require("@logger"));
function postDevice(deviceId, deviceType) {
    return __awaiter(this, void 0, void 0, function* () {
        const existDevice = yield models_1.Device.findByPk(deviceId);
        if (existDevice) {
            return existDevice;
        }
        else {
            const device = yield models_1.Device.create({ id: deviceId, name: deviceId, type: deviceType });
            _logger_1.default.trace(`device가 등록되었습니다. ${JSON.stringify(device, null, 4)}`);
            return device;
        }
    });
}
exports.default = postDevice;
//# sourceMappingURL=postDevice.js.map