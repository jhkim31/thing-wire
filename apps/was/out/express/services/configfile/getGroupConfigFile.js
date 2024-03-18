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
const configfile_1 = __importDefault(require("@dals/configfile"));
const ConfigFileParser_1 = __importDefault(require("@db/parser/ConfigFileParser"));
function getGroupConfigFile(groupId, configFileId) {
    return __awaiter(this, void 0, void 0, function* () {
        const configFile = yield configfile_1.default.getGroupConfigFile(groupId, configFileId);
        const configFileInfo = (0, ConfigFileParser_1.default)(configFile);
        return configFileInfo;
    });
}
exports.default = getGroupConfigFile;
//# sourceMappingURL=getGroupConfigFile.js.map