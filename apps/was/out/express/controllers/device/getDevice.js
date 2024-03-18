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
/**
 * 특정 조직, 그룹 아래에 있는 장치 하나의 정보를 리턴함.
 * @param req
 * @param res
 * @param next
 */
function getDevice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orgId = req.params.org_id;
            const groupId = req.params.group_id;
            const deviceId = req.params.device_id;
            if (orgId === "" || groupId === "" || deviceId === "") {
                throw new Error_1.BadRequestError(`org_id | group_id | device_id is empty`);
            }
            const deviceInfo = yield device_1.default.getDevice(deviceId);
            res.status(200).json((0, createResponseMessage_1.default)('success', 'success', deviceInfo));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getDevice;
//# sourceMappingURL=getDevice.js.map