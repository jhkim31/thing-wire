import { Router } from 'express';

import DeviceController from '@controllers/device';
import GroupController from '@controllers/group';

import GroupDeviceRouter from './device/device.group.router';
import ConfigFileRouter from './configfile.router';

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
const GroupRouter = Router({mergeParams: true});

GroupRouter.get("/", GroupController.getOrganizationGroups);
GroupRouter.post("/", GroupController.postGroup);
GroupRouter.get("/:group_id", GroupController.getGroup);
GroupRouter.delete("/:group_id", GroupController.deleteGroup);

GroupRouter.post("/:group_id/settings", GroupController.updateGroupSetting);
GroupRouter.get("/:group_id/device_data", DeviceController.getGroupDevicesData);

GroupRouter.use("/:group_id/configfiles", ConfigFileRouter);
GroupRouter.use(`/:group_id/devices`, GroupDeviceRouter);

export default GroupRouter;