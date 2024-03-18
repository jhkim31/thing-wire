import express from 'express';
import multer from 'multer';
import DeviceController from 'src/express/controllers/device';

const storage = multer.memoryStorage(); // 파일을 메모리에 저장하는 storage 설정
const upload = multer({ storage });

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
const OrgDeviceRouter = express.Router({mergeParams: true});

OrgDeviceRouter.get("/", DeviceController.getOrganizationDevices);
OrgDeviceRouter.post("/", DeviceController.addDevicesToOrganization);
OrgDeviceRouter.get("/:device_id", DeviceController.getDevice);
OrgDeviceRouter.post("/:device_id/comment", DeviceController.postComment);
OrgDeviceRouter.post("/:device_id/command", DeviceController.postCommands);
OrgDeviceRouter.post("/:device_id/upload", upload.single("file"), DeviceController.uploadFile);
OrgDeviceRouter.get("/:device_id/systemdata", DeviceController.getSystemData);

export default OrgDeviceRouter;