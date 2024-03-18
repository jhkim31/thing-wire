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
const GroupDeviceRouter = express.Router({mergeParams: true});

GroupDeviceRouter.get("/", DeviceController.getGroupDevices);
GroupDeviceRouter.post("/", DeviceController.addDevicesToGroup);

GroupDeviceRouter.get("/:device_id", DeviceController.getDevice);
GroupDeviceRouter.post("/:device_id", DeviceController.postDevice);
GroupDeviceRouter.post("/:device_id/comment", DeviceController.postComment);
GroupDeviceRouter.post("/:device_id/command", DeviceController.postCommands);
GroupDeviceRouter.post("/:device_id/upload", upload.single("file"), DeviceController.uploadFile);
GroupDeviceRouter.get("/:device_id/systemdata", DeviceController.getSystemData);

export default GroupDeviceRouter;