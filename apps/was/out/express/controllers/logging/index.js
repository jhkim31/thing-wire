"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _logger_1 = __importDefault(require("@logger"));
/**
 * 로그를 출력하기 위한 미들웨어 컨트롤러.
 *
 * ## Method
 * * defaultLog
 */
class LoggingController {
    /**
     * 요청이 들어온 Method, URL, 요청을 날린 User, 그외
     * 요청 params, query, body의 정보를 출력한다.
     */
    static defaultLog(req, res, next) {
        _logger_1.default.debug(`${req.method} ${req.originalUrl} ${res.locals.payload.name}\nparams : ${JSON.stringify(req.params, null, 4)}\nquery : ${JSON.stringify(req.query, null, 4)}\nbody : ${JSON.stringify(req.body, null, 4)}`);
        next();
    }
}
exports.default = LoggingController;
//# sourceMappingURL=index.js.map