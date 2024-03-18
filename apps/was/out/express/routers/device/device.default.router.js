"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("@controllers/auth"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const device_1 = __importDefault(require("src/express/controllers/device"));
const storage = multer_1.default.memoryStorage(); // 파일을 메모리에 저장하는 storage 설정
const upload = (0, multer_1.default)({ storage });
/**
 * # Device Default Router
 * 특정 org, group에 상관없이 device 자체로 요청을 보낼때 사용하는 라우터
 * ## endpoint
 * `/api/v1/devices`
 * ## method
 * * `GET /` : 모든 devices를 가져온다. (admin 전용)
 * * `POST /:device_id` : `device_id` 를 서버에 등록한다.
 * * `POST /:device_id/comment` : `device_id` 에 comment를 등록한다.
 * * `POST /:device_id/command` : `device_id` 에 command를 등록한다.
 * * `POST /:device_id/file` : `device_id` 에 file를 등록한다.
 * * `GET /:device_id/systemdata` : `device_id` 의 시스템 데이터를 가져온다.
 *      * cpu, memory, docker등.
 * * `POST /:device_id/tsdbdata` : `device_id` 의 tsdb데이터를 가져온다.
 */
const DeviceDefaultRouter = express_1.default.Router({ mergeParams: true });
DeviceDefaultRouter.get("/", auth_1.default.verifyAuth, device_1.default.getAllDevices);
DeviceDefaultRouter.post("/:device_id", device_1.default.postDevice);
DeviceDefaultRouter.post("/:device_id/comment", device_1.default.postComment);
DeviceDefaultRouter.post("/:device_id/commands", device_1.default.postCommands);
DeviceDefaultRouter.put("/:device_id/files", upload.single("file"), device_1.default.uploadFile);
DeviceDefaultRouter.get("/:device_id/systemdata", device_1.default.getSystemData);
DeviceDefaultRouter.get("/:device_id/tsdbdata", device_1.default.getTsdbData);
exports.default = DeviceDefaultRouter;
//# sourceMappingURL=device.default.router.js.map