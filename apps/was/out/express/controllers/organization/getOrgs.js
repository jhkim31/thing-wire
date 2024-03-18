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
const _logger_1 = __importDefault(require("@logger"));
const organization_1 = __importDefault(require("@services/organization"));
/**
 * 유저가 속한 모든 조직리스트 리턴.
 */
function getOrgs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDetail = req.query.detail;
            const jwtPayload = res.locals.payload;
            if ((jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.id) == undefined) {
                throw new Error_1.InvalidTokenError("token payload error");
            }
            if (isDetail == "true") {
                const orgDataTable = yield organization_1.default.getOrgsDetail(jwtPayload.id);
                _logger_1.default.info(`orgs 정보 제공\n${JSON.stringify(orgDataTable, null, 4)}`);
                return res.status(200).json((0, createResponseMessage_1.default)("success", "Get User's Organizations", orgDataTable));
            }
            else {
                const orgInfos = yield organization_1.default.getOrgsSimple(jwtPayload.id);
                _logger_1.default.info(`orgs 정보 제공\n${JSON.stringify(orgInfos, null, 4)}`);
                return res.status(200).json((0, createResponseMessage_1.default)("success", "Get User's Organizations", orgInfos));
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getOrgs;
//# sourceMappingURL=getOrgs.js.map