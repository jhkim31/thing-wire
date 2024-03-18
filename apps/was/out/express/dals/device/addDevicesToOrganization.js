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
const models_1 = require("@db/models");
const _logger_1 = __importDefault(require("@logger"));
function addDevicesToOrganization(orgId, deviceIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const org = models_1.Organization.findByPk(orgId);
        if (org == null) {
            throw new Error_1.BadRequestError(`orgId가 잘못되었습니다. ${orgId}`);
        }
        for (const deviceId of deviceIds) {
            yield models_1.OrgDevice.create({ orgId: orgId, deviceId: deviceId });
        }
        _logger_1.default.trace(`${JSON.stringify(deviceIds)} 가 ${orgId}에 추가되었습니다.`);
        return true;
    });
}
exports.default = addDevicesToOrganization;
//# sourceMappingURL=addDevicesToOrganization.js.map