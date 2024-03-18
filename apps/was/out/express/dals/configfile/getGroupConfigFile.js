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
const Error_1 = require("shared/Error");
function getGroupConfigFile(groupId, configFileId) {
    return __awaiter(this, void 0, void 0, function* () {
        const configFile = yield models_1.ConfigFile.findByPk(configFileId, {
            include: [
                {
                    model: models_1.User,
                    as: "modifier"
                }
            ]
        });
        if (configFile === null) {
            throw new Error_1.SequelizeError(`ConfigFile을 찾지 못했습니다  (group, configfile) : (${groupId}, ${configFileId})`);
        }
        return configFile;
    });
}
exports.default = getGroupConfigFile;
//# sourceMappingURL=getGroupConfigFile.js.map