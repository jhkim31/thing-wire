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
const uuid_1 = require("uuid");
const _ajv_1 = __importDefault(require("@ajv"));
const group_1 = __importDefault(require("@services/group"));
function postGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupId = (0, uuid_1.v4)();
            const groupName = req.body.name;
            const orgId = req.body.orgId;
            const jwtPayload = res.locals.payload;
            const validate = _ajv_1.default.getSchema("jwt.CustomPayload");
            if (!validate) {
                throw new Error_1.AJVError(`jwt.CustomPayload schema is not defined`);
            }
            if (!validate(jwtPayload)) {
                throw new Error_1.AJVError(`jwt payload is not match schema`);
            }
            const group = yield group_1.default.postGroup(groupId, groupName, orgId);
            res.status(200).json((0, createResponseMessage_1.default)("success", "success", { group }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postGroup;
//# sourceMappingURL=postGroup.js.map