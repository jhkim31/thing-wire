import AuthController from '@controllers/auth';
import express from 'express';
import multer from 'multer';
import DeviceController from 'src/express/controllers/device';

const storage = multer.memoryStorage(); // 파일을 메모리에 저장하는 storage 설정
const upload = multer({ storage });

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
const DeviceDefaultRouter = express.Router({mergeParams: true});

DeviceDefaultRouter.get("/", AuthController.verifyAuth, DeviceController.getAllDevices);
DeviceDefaultRouter.post("/:device_id", DeviceController.postDevice);
DeviceDefaultRouter.post("/:device_id/comment", DeviceController.postComment);
DeviceDefaultRouter.post("/:device_id/commands", DeviceController.postCommands);
DeviceDefaultRouter.put("/:device_id/files", upload.single("file"), DeviceController.uploadFile);
DeviceDefaultRouter.get("/:device_id/systemdata", DeviceController.getSystemData);
DeviceDefaultRouter.get("/:device_id/tsdbdata", DeviceController.getTsdbData);

export default DeviceDefaultRouter;