"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const config_router_1 = __importDefault(require("./config.router"));
const device_default_router_1 = __importDefault(require("./device/device.default.router"));
const org_router_1 = __importDefault(require("./org.router"));
const WAS_VERSION = process.env.WAS_VERSION;
assert_1.default.strictEqual(typeof WAS_VERSION, "string", "WAS_VERSION (이)가 선언되지 않았습니다.");
/**
 * ## API Router
 * ### `/api`
 * * /auth : AuthRouter
 * * /orgs : OrganizationRouter
 * * /devices : DeviceDefaultRouter
 * * /config : ConfigRouter
*/
const ApiRouter = (0, express_1.Router)({ mergeParams: true });
ApiRouter.use(`/${WAS_VERSION}/auth`, auth_router_1.default);
ApiRouter.use(`/${WAS_VERSION}/orgs`, org_router_1.default);
ApiRouter.use(`/${WAS_VERSION}/devices`, device_default_router_1.default);
ApiRouter.use(`/${WAS_VERSION}/config`, config_router_1.default);
exports.default = ApiRouter;
//# sourceMappingURL=APIRouter.js.map