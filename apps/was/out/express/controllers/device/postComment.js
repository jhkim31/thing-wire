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
const device_1 = __importDefault(require("@services/device"));
const _logger_1 = __importDefault(require("@logger"));
function postComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deviceId = req.params.device_id;
            const comment = req.body.comment;
            if (typeof deviceId !== "string" || typeof comment !== "string") {
                throw new Error_1.BadRequestError("deviceId || comment is empty");
            }
            const result = yield device_1.default.postComment(deviceId, comment);
            _logger_1.default.debug(`${deviceId} 에 주석이 등록되었습니다. ${comment}`);
            return res.status(200).json((0, createResponseMessage_1.default)("success", "success", { result }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postComment;
//# sourceMappingURL=postComment.js.map