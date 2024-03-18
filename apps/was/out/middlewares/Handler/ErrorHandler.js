"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("shared/Error");
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const _logger_1 = __importDefault(require("@logger"));
/**
 * Express Error Handler
 * ## 처리 가능 오류
 * * BadRequestError
 * * InvalidError
 * * InvalidTokenError
 * * AuthenticationError
 * * SyntaxError
 * * TimeoutError
 */
function ErrorHandle(error, req, res, next) {
    if (error instanceof Error) {
        _logger_1.default.error(`${req.method} ${req.originalUrl}\n${error.stack}`);
    }
    else {
        _logger_1.default.error(`${req.method} ${req.originalUrl} unknown error`);
    }
    switch (true) {
        case error instanceof Error_1.BadRequestError:
            return res.status(400).json((0, createResponseMessage_1.default)("error", "bad request", {}));
        case error instanceof Error_1.SyntaxError:
            return res.status(400).json((0, createResponseMessage_1.default)("error", "bad request (SyntaxError)", {}));
        case error instanceof Error_1.TimeoutError:
            return res.status(500).json((0, createResponseMessage_1.default)("error", "timeout", {}));
        case error instanceof Error_1.InvalidError:
            return res.status(401).json((0, createResponseMessage_1.default)("error", "invalid request", {}));
        case error instanceof Error_1.InvalidTokenError:
            return res.status(401).json((0, createResponseMessage_1.default)("error", "invalid token", {}));
        case error instanceof Error_1.AuthenticationError:
            return res.status(401).json((0, createResponseMessage_1.default)("error", "timeout", {}));
        default:
            return res.status(500).json((0, createResponseMessage_1.default)("error", "unknown error", {}));
    }
}
exports.default = ErrorHandle;
//# sourceMappingURL=ErrorHandler.js.map