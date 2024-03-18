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
const group_1 = __importDefault(require("@dals/group"));
const parser_1 = require("@db/parser");
function postGroup(groupId, groupName, orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield group_1.default.postGroup(groupId, groupName, orgId);
        const groupInfo = (0, parser_1.GroupParser)(group);
        return groupInfo;
    });
}
exports.default = postGroup;
//# sourceMappingURL=postGroup.js.map