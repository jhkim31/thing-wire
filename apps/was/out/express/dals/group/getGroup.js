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
const Error_1 = require("shared/Error");
const models_1 = require("@db/models");
function getGroup(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield models_1.Group.findByPk(groupId, { include: [
                {
                    model: models_1.ConfigFile,
                    as: "configFile"
                }
            ] });
        if (group == null) {
            throw new Error_1.BadRequestError(`group을 찾을 수 없습니다 : ${groupId}`);
        }
        return group;
    });
}
exports.default = getGroup;
//# sourceMappingURL=getGroup.js.map