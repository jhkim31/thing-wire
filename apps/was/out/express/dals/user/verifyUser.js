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
const models_1 = require("@db/models");
const _logger_1 = __importDefault(require("@logger"));
function verifyUser(userId, userPw) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ where: { id: userId } });
        if (user == null) {
            _logger_1.default.error(`unregisted user : ${userId}`);
            throw new Error_1.InvalidError("Unregistered ID or ID, PW mis-match");
        }
        const isValidUser = yield user.comparePassword(userPw);
        if (isValidUser) {
            _logger_1.default.trace(`valid user : ${userId}`);
            return user;
        }
        else {
            _logger_1.default.trace(`invalid user : ${userId}`);
            throw new Error_1.InvalidError("Unregistered ID or ID, PW mis-match");
        }
    });
}
exports.default = verifyUser;
//# sourceMappingURL=verifyUser.js.map