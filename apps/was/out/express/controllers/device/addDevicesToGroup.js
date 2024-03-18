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
const _ajv_1 = __importDefault(require("@ajv"));
const device_1 = __importDefault(require("@services/device"));
const _logger_1 = __importDefault(require("@logger"));
function addDevicesToGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupId = req.params.group_id;
            const deviceIds = req.body.devices;
            const validate = _ajv_1.default.getSchema("StringArray");
            if (validate == undefined) {
                throw new Error_1.AJVError(`ajv get schema error : StringArray`);
            }
            const isValid = validate(deviceIds);
            if (!isValid) {
                throw new Error_1.AJVError("deviceId가 StringArray타입이 아닙니다.");
            }
            const result = yield device_1.default.addDevicesToGroup(groupId, deviceIds);
            _logger_1.default.debug(`${JSON.stringify(deviceIds)} 가 ${groupId}에 추가되었습니다.`);
            return res.status(200).json((0, createResponseMessage_1.default)("success", "success", { result }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = addDevicesToGroup;
//# sourceMappingURL=addDevicesToGroup.js.map