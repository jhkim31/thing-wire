"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("@controllers/auth"));
const organization_1 = __importDefault(require("@controllers/organization"));
const user_1 = __importDefault(require("@controllers/user"));
const group_router_1 = __importDefault(require("./group.router"));
const logging_1 = __importDefault(require("@controllers/logging"));
const device_org_router_1 = __importDefault(require("./device/device.org.router"));
/**
 * # Organization Router
 * ## endpoint
 * `/api/v1/orgs/`
 * ## method
 * * `GET /` : 사용자의 organizations를 가져옵니다.
 * * `POST /` : 새로운 organization을 생성합니다.
 * * `DELETE /:org_id` : 사용자가 `org_id` 의 소유자라면 organization을 삭제합니다.
 * * `GET /:org_id/members` : `org_id` 에 속한 members를 보여줍니다.
 * * `GET /:org_id/devices` : `org_id` 에 속한 devices를 보여줍니다.
 * * `POST /:org_id/devices` : `org_id` 에 장치들을 등록한다
 * * `/:org_id/groups` : Group Router
 */
const OrganizationRouter = express_1.default.Router({ mergeParams: true });
OrganizationRouter.use(auth_1.default.verifyAuth);
OrganizationRouter.use(logging_1.default.defaultLog);
OrganizationRouter.get("/", organization_1.default.getOrgs);
OrganizationRouter.post("/", organization_1.default.postOrg);
OrganizationRouter.delete("/:org_id", organization_1.default.deleteOrg);
OrganizationRouter.get("/:org_id/members", user_1.default.getOrganizationMembers);
OrganizationRouter.use("/:org_id/devices", device_org_router_1.default);
OrganizationRouter.use("/:org_id/groups", group_router_1.default);
exports.default = OrganizationRouter;
//# sourceMappingURL=org.router.js.map