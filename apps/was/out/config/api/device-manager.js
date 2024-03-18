"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _logger_1 = __importDefault(require("@logger"));
const assert_1 = __importDefault(require("assert"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const DEVICE_MANAGER_PROTOCOL = process.env.DEVICE_MANAGER_PROTOCOL;
const DEVICE_MANAGER_HOST = process.env.DEVICE_MANAGER_HOST;
const DEVICE_MANAGER_PORT = process.env.DEVICE_MANAGER_PORT;
const DEVICE_MANAGER_VERSION = process.env.DEVICE_MANAGER_VERSION;
const DEVICE_MANAGER_TIMEOUT = process.env.DEVICE_MANAGER_TIMEOUT;
assert_1.default.strictEqual(typeof DEVICE_MANAGER_PROTOCOL, "string", "DEVICE_MANAGER_PROTOCOL (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof DEVICE_MANAGER_HOST, "string", "DEVICE_MANAGER_HOST (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof DEVICE_MANAGER_PORT, "string", "DEVICE_MANAGER_PORT (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof DEVICE_MANAGER_VERSION, "string", "DEVICE_MANAGER_VERSION (이)가 선언되지 않았습니다.");
assert_1.default.strictEqual(typeof DEVICE_MANAGER_TIMEOUT, "string", "DEVICE_MANAGER_TIMEOUT (이)가 선언되지 않았습니다.");
const DEVICE_MANAGER_TIMEOUT_INT = parseInt(DEVICE_MANAGER_TIMEOUT);
assert_1.default.strictEqual(isNaN(DEVICE_MANAGER_TIMEOUT_INT), false, "DEVICE_MANAGER_TIMEOUT_INT (이)가 정상적으로 선언되지 않았습니다.");
const agent = new https_1.default.Agent({ rejectUnauthorized: false });
/**
 * Device-Manager와 통신하는 Axios Instance
 *
 */
const api = axios_1.default.create({
    baseURL: `${DEVICE_MANAGER_PROTOCOL}://${DEVICE_MANAGER_HOST}:${DEVICE_MANAGER_PORT}/${DEVICE_MANAGER_VERSION}`,
    httpsAgent: agent,
    timeout: DEVICE_MANAGER_TIMEOUT_INT
});
api.get('/test')
    .then(d => {
    _logger_1.default.info(`axios ready`);
})
    .catch(e => {
    _logger_1.default.error(`axios error ${e}`);
});
exports.default = api;
//# sourceMappingURL=device-manager.js.map