"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const assert_1 = __importDefault(require("assert"));
const _logger_1 = __importDefault(require("@logger"));
const models = __importStar(require("./models"));
const MARIADB_HOST = process.env.MARIADB_HOST;
const MARIADB_PORT = process.env.MARIADB_PORT;
const MARIADB_DB = process.env.MARIADB_DB;
const MARIADB_USERNAME = process.env.MARIADB_USERNAME;
const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
assert_1.default.strictEqual(typeof MARIADB_HOST, "string", "MARIADB_HOST (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof MARIADB_PORT, "string", "MARIADB_PORT (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof MARIADB_DB, "string", "MARIADB_DB (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof MARIADB_USERNAME, "string", "MARIADB_USERNAME (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof MARIADB_PASSWORD, "string", "MARIADB_PASSWORD (이)가 선언되지 않았습니다.");
const MARIADB_PORT_INT = parseInt(MARIADB_PORT);
assert_1.default.strictEqual(isNaN(MARIADB_PORT_INT), false, "MARIADB_PORT (이)가 정상적으로 선언되지 않았습니다.");
const sequelize = new sequelize_typescript_1.Sequelize({
    host: MARIADB_HOST,
    port: MARIADB_PORT_INT,
    database: MARIADB_DB,
    username: MARIADB_USERNAME,
    password: MARIADB_PASSWORD,
    dialect: "mariadb",
    timezone: "+09:00",
    logging: false,
});
function sequelize_init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            sequelize.addModels(Object.values(models));
            yield sequelize.sync({ alter: true });
            yield models.User.findOrCreate({ where: { id: "kimwwo" }, defaults: { name: "kim", id: "kimwwo", password: "1234", isSA: true } });
            yield models.User.findOrCreate({ where: { id: "keti" }, defaults: { name: "keti", id: "keti", password: "430430430t!", isSA: true } });
            _logger_1.default.info("sequelize init");
        }
        catch (err) {
            if (err instanceof Error) {
                _logger_1.default.error(`sequelize init error ${err.message}`);
            }
            else {
                _logger_1.default.error(`sequelize init error ${"알 수 없는 에러"}\n`);
            }
        }
    });
}
sequelize_init();
exports.default = sequelize;
//# sourceMappingURL=index.js.map