"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config();
}
else if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config({ path: "../../.env" });
}
else {
    dotenv_1.default.config();
}
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const staticPath_1 = __importDefault(require("shared/lib/staticPath"));
const _express_1 = __importDefault(require("@express"));
const ErrorHandler_1 = __importDefault(require("@middlewares/Handler/ErrorHandler"));
const APIRouter_1 = __importDefault(require("@routers/APIRouter"));
const view_router_1 = __importDefault(require("@routers/view.router"));
const WAS_PORT = process.env.WAS_PORT;
assert_1.default.strictEqual(typeof WAS_PORT, "string", "WAS_PORT (이)가 선언되지 않았습니다.");
const WAS_PORT_INT = parseInt(WAS_PORT);
assert_1.default.strictEqual(isNaN(WAS_PORT_INT), false, `WAS_PORT (이)가 정상적으로 선언되지 않았습니다. : ${WAS_PORT}`);
_express_1.default.use('/api', APIRouter_1.default);
_express_1.default.use(`/`, view_router_1.default);
_express_1.default.use((req, res, next) => {
    return res.status(404).send("404 Not Found");
});
_express_1.default.use(ErrorHandler_1.default);
const options = {
    key: fs_1.default.readFileSync((0, staticPath_1.default)("./thing_wire.key")),
    cert: fs_1.default.readFileSync((0, staticPath_1.default)("./thing_wire.cert")),
};
const server = https_1.default.createServer(options, _express_1.default);
server.listen(WAS_PORT_INT, () => {
});
//# sourceMappingURL=main.js.map