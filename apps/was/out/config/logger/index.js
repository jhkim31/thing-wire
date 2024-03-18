"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const assert_1 = __importDefault(require("assert"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const staticPath_1 = __importDefault(require("shared/lib/staticPath"));
const format = winston_1.default.format;
const { timestamp, colorize, printf } = winston_1.default.format;
const WAS_LOGDIR = process.env.WAS_LOGDIR;
assert_1.default.strictEqual(typeof WAS_LOGDIR, "string", "WAS_LOGDIR 가 선언되지 않았습니다.");
const WAS_CONSOLE_LOGLEVEL = process.env.WAS_CONSOLE_LOGLEVEL;
assert_1.default.strictEqual(typeof WAS_CONSOLE_LOGLEVEL, "string", "WAS_CONSOLE_LOGLEVEL 가 선언되지 않았습니다.");
const WAS_FILE_LOGLEVEL = process.env.WAS_FILE_LOGLEVEL;
assert_1.default.strictEqual(typeof WAS_FILE_LOGLEVEL, "string", "WAS_FILE_LOGLEVEL 가 선언되지 않았습니다.");
const levelColors = {
    trace: 'grey',
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red',
};
const CustomLevel = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
};
const logFormat = format.combine(colorize({ all: true, colors: levelColors }), timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), printf(({ level: level, message: message, timestamp: timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
}));
const transport = new winston_daily_rotate_file_1.default({
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: WAS_LOGDIR,
    level: WAS_FILE_LOGLEVEL,
    frequency: "1m",
    zippedArchive: true,
    maxSize: '20m',
});
const logger = winston_1.default.createLogger({
    levels: CustomLevel,
    format: logFormat,
    transports: [
        transport,
        new winston_1.default.transports.Console({
            level: WAS_CONSOLE_LOGLEVEL
        }),
    ],
});
logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.info(`log path : ${(0, staticPath_1.default)(WAS_LOGDIR)}`);
exports.default = logger;
//# sourceMappingURL=index.js.map