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
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const device_1 = __importDefault(require("@services/device"));
function getAllDevices(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDetail = req.query.detail;
            if (isDetail) {
                const dataTable = yield device_1.default.getAllDevices();
                return res.status(200).json((0, createResponseMessage_1.default)("success", "success", dataTable));
            }
            else {
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getAllDevices;
//# sourceMappingURL=getAllDevices.js.map