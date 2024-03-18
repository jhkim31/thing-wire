
import winston from "winston";
import assert from "assert";
import DailyRotateFile from 'winston-daily-rotate-file';
import staticPath from "shared/lib/staticPath";

const format = winston.format;
const { timestamp, colorize, printf } = winston.format;

const DEVICE_MANAGER_LOGDIR = process.env.DEVICE_MANAGER_LOGDIR as string;
assert.strictEqual(typeof DEVICE_MANAGER_LOGDIR, "string", "DEVICE_MANAGER_LOGDIR 가 선언되지 않았습니다.");
const DEVICE_MANAGER_CONSOLE_LOGLEVEL = process.env.DEVICE_MANAGER_CONSOLE_LOGLEVEL as string;
assert.strictEqual(typeof DEVICE_MANAGER_CONSOLE_LOGLEVEL, "string", "DEVICE_MANAGER_CONSOLE_LOGLEVEL 가 선언되지 않았습니다.");
const DEVICE_MANAGER_FILE_LOGLEVEL = process.env.DEVICE_MANAGER_FILE_LOGLEVEL as string;
assert.strictEqual(typeof DEVICE_MANAGER_FILE_LOGLEVEL, "string", "DEVICE_MANAGER_FILE_LOGLEVEL 가 선언되지 않았습니다.");

const levelColors = {
    trace: 'grey',
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red',
}

const CustomLevel: winston.config.AbstractConfigSetLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
};

const logFormat = format.combine(
    colorize({ all: true, colors: levelColors }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    printf(({ level: level, message: message, timestamp: timestamp }) => {                
        return `${timestamp} [${level}] ${message}`;
    })
);

const transport: DailyRotateFile = new DailyRotateFile({
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: DEVICE_MANAGER_LOGDIR,
    level: DEVICE_MANAGER_FILE_LOGLEVEL,
    frequency: "1m",
    zippedArchive: true,
    maxSize: '20m',
});

interface CustomLogger extends winston.Logger {
    error: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;
    trace: winston.LeveledLogMethod;
}

const logger: CustomLogger = <CustomLogger>winston.createLogger({
    levels: CustomLevel,        
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({
            level: DEVICE_MANAGER_CONSOLE_LOGLEVEL
        }),
    ],
});

logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.info(`log path : ${staticPath(DEVICE_MANAGER_LOGDIR)}`);

export default logger;