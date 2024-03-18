"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _logger_1 = __importDefault(require("@logger"));
const ajv_1 = __importDefault(require("ajv"));
const CustomJWTPayloadSchema_1 = __importDefault(require("shared/schema/CustomJWTPayloadSchema"));
const StringArraySchema_1 = __importDefault(require("shared/schema/StringArraySchema"));
const UserAuthSchema_1 = __importDefault(require("shared/schema/UserAuthSchema"));
/**
 * # AJV Instance
 * ## Schema List
 * * UserAuthSchema
 * * StringArraySchema
 * * CustomJWTPayloadSchema
 */
const ajv = new ajv_1.default();
ajv.addSchema(UserAuthSchema_1.default);
ajv.addSchema(StringArraySchema_1.default);
ajv.addSchema(CustomJWTPayloadSchema_1.default);
_logger_1.default.info(`ajv ready`);
exports.default = ajv;
//# sourceMappingURL=index.js.map