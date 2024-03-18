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
const _logger_1 = __importDefault(require("@logger"));
const organization_1 = __importDefault(require("@services/organization"));
/**
 * 조직 등록
 * @param req
 * @param res
 * @param next
 */
function postOrg(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const orgId = (0, uuid_1.v4)();
        const orgName = req.body.name;
        try {
            const jwtPayload = res.locals.payload;
            if ((jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.id) == undefined) {
                throw new Error_1.InvalidTokenError("token payload error");
            }
            const organization = yield organization_1.default.postOrg(orgId, orgName, jwtPayload.id);
            _logger_1.default.info(`org 생성 완료\n${JSON.stringify(organization, null, 4)}`);
            res.status(200).json((0, createResponseMessage_1.default)("success", "Post New Organizations", { org: organization }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postOrg;
//# sourceMappingURL=postOrg.js.map