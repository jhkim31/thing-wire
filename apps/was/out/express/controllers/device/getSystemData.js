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
const device_manager_1 = __importDefault(require("@api/device-manager"));
const device_1 = __importDefault(require("@services/device"));
const statusHandler_1 = __importDefault(require("shared/lib/axios/statusHandler"));
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
function getSystemData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deviceId = req.params.device_id;
            const systemdata = yield device_manager_1.default
                .get(`devices/${deviceId}/systemdata`)
                .then((d) => {
                const checkstatus = (0, statusHandler_1.default)(d);
                return checkstatus;
            });
            const deviceInfo = yield device_1.default.getDevice(deviceId);
            res.status(200).json((0, createResponseMessage_1.default)('success', 'success', { state: systemdata, info: deviceInfo, id: deviceId }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getSystemData;
//# sourceMappingURL=getSystemData.js.map