"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const device_1 = __importDefault(require("src/express/controllers/device"));
const storage = multer_1.default.memoryStorage(); // 파일을 메모리에 저장하는 storage 설정
const upload = (0, multer_1.default)({ storage });
/**
 * # Device Router
 * ## endpoint
 * `/api/v1/orgs/:org_id/groups/:group_id/devices`
 * ## method
 * * `GET /` : 사용자의 organizations를 가져옵니다.
 * * `POST /` : 새로운 organization을 생성합니다.
 * * `DELETE /:org_id` : 사용자가 `org_id` 의 소유자라면 organization을 삭제합니다.
 * * `GET /:org_id/members` : `org_id` 에 속한 members를 보여줍니다.
 * * `GET /:org_id/devices` : `org_id` 에 속한 devices를 보여줍니다.
 * * `POST /:org_id/devices` : `org_id` 에 장치들을 등록한다
 * * `/:org_id/groups` : Group Router
 */
const OrgDeviceRouter = express_1.default.Router({ mergeParams: true });
OrgDeviceRouter.get("/", device_1.default.getOrganizationDevices);
OrgDeviceRouter.post("/", device_1.default.addDevicesToOrganization);
OrgDeviceRouter.get("/:device_id", device_1.default.getDevice);
OrgDeviceRouter.post("/:device_id/comment", device_1.default.postComment);
OrgDeviceRouter.post("/:device_id/command", device_1.default.postCommands);
OrgDeviceRouter.post("/:device_id/upload", upload.single("file"), device_1.default.uploadFile);
OrgDeviceRouter.get("/:device_id/systemdata", device_1.default.getSystemData);
exports.default = OrgDeviceRouter;
//# sourceMappingURL=device.org.router.js.map