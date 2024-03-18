"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("@controllers/auth"));
const assert_1 = __importDefault(require("assert"));
const express_1 = require("express");
const fs_1 = require("fs");
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const staticPath_1 = __importDefault(require("shared/lib/staticPath"));
const WAS_VERSION = process.env.WAS_VERSION;
assert_1.default.strictEqual(typeof WAS_VERSION, "string", "WAS_VERSION (이)가 선언되지 않았습니다.");
const ConfigRouter = (0, express_1.Router)({ mergeParams: true });
ConfigRouter.get(`/`, auth_1.default.verifyAuth, (req, res) => {
    const configFilePath = (0, staticPath_1.default)("./src/config/module_info.json");
    const configJsonBuf = (0, fs_1.readFileSync)(configFilePath);
    const configJsonStr = configJsonBuf.toString("utf-8");
    const configJson = JSON.parse(configJsonStr);
    return res.status(200).json((0, createResponseMessage_1.default)("success", "success", configJson));
});
exports.default = ConfigRouter;
//# sourceMappingURL=config.router.js.map