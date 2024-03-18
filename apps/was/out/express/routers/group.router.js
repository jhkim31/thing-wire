"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_1 = __importDefault(require("@controllers/device"));
const group_1 = __importDefault(require("@controllers/group"));
const device_group_router_1 = __importDefault(require("./device/device.group.router"));
const configfile_router_1 = __importDefault(require("./configfile.router"));
/**
 * # Group Router
 * ## endpoint
 * `/api/v1/orgs/:org_id/groups`
 * ## method
 * * `GET /` : `org_id` 에 속한 groups를 가져옵니다.
 * * `POST /` : `org_id`에 속한 새로운 Group을 생성합니다.
 * * `DELETE /:group_id` : `org_id`에 속한 `group_id`를 삭제합니다.
 * * `GET /:group_id/device_data` : `group_id` 에 속한 device의 정보를 가져옵니다.
 *      * 현재 KETI 환경센서 전용.
 *      * 센서의 co2, pm25 등 정보.
 * * `GET /:group_id/devices` : `group_id` 에 속한 devices를 가져옵니다.
 *      * devices의 이름, id등 정보
 * * `POST /:group_id/devices` : devices 들을 `group_id` 로 추가한다.
 * * `/:group_id/devices` : Device Rotuter
 */
const GroupRouter = (0, express_1.Router)({ mergeParams: true });
GroupRouter.get("/", group_1.default.getOrganizationGroups);
GroupRouter.post("/", group_1.default.postGroup);
GroupRouter.get("/:group_id", group_1.default.getGroup);
GroupRouter.delete("/:group_id", group_1.default.deleteGroup);
GroupRouter.post("/:group_id/settings", group_1.default.updateGroupSetting);
GroupRouter.get("/:group_id/device_data", device_1.default.getGroupDevicesData);
GroupRouter.use("/:group_id/configfiles", configfile_router_1.default);
GroupRouter.use(`/:group_id/devices`, device_group_router_1.default);
exports.default = GroupRouter;
//# sourceMappingURL=group.router.js.map