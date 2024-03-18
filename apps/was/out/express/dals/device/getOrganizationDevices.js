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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@db/models");
function getOrganizationDevices(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield models_1.Device.findAll({
            include: [
                {
                    model: models_1.Organization,
                    where: { id: orgId },
                },
                {
                    model: models_1.Group,
                    include: [
                        {
                            model: models_1.Organization,
                            where: { id: orgId }
                        }
                    ]
                }
            ]
        });
        return devices;
    });
}
exports.default = getOrganizationDevices;
//# sourceMappingURL=getOrganizationDevices.js.map