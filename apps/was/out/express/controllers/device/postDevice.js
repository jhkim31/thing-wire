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
const Error_1 = require("shared/Error");
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const device_1 = __importDefault(require("@services/device"));
const _logger_1 = __importDefault(require("@logger"));
function postDevice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deviceId = req.params.device_id;
            const deviceType = req.body.type;
            if (typeof deviceType !== "number") {
                throw new Error_1.BadRequestError(`type is not number ${deviceType}`);
            }
            if (typeof deviceId !== "string") {
                throw new Error_1.BadRequestError("deviceId is Empty");
            }
            const device = yield device_1.default.postDevice(deviceId, deviceType);
            _logger_1.default.debug(`device가 등록되었습니다. \n${JSON.stringify(device, null, 4)}`);
            return res.status(200).json((0, createResponseMessage_1.default)("success", "success", { device }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postDevice;
//# sourceMappingURL=postDevice.js.map