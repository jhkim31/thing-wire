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
const group_1 = __importDefault(require("@services/group"));
function getGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orgId = req.params.org_id;
            const groupId = req.params.group_id;
            if (groupId === "" || orgId === "") {
                throw new Error_1.BadRequestError(`org_id | group_id is empty`);
            }
            const groupInfo = yield group_1.default.getGroup(groupId);
            return res.status(200).json((0, createResponseMessage_1.default)("success", "success", groupInfo));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getGroup;
//# sourceMappingURL=getGroup.js.map