import express from 'express';

import AuthController from '@controllers/auth';
import OrgController from '@controllers/organization';
import UserController from '@controllers/user';

import GroupRouter from './group.router';
import LoggingController from '@controllers/logging';
import OrgDeviceRouter from './device/device.org.router';

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
const OrganizationRouter = express.Router({mergeParams: true});

OrganizationRouter.use(AuthController.verifyAuth);
OrganizationRouter.use(LoggingController.defaultLog);

OrganizationRouter.get("/", OrgController.getOrgs);
OrganizationRouter.post("/", OrgController.postOrg);

OrganizationRouter.delete("/:org_id", OrgController.deleteOrg);
OrganizationRouter.get("/:org_id/members", UserController.getOrganizationMembers);

OrganizationRouter.use("/:org_id/devices", OrgDeviceRouter);
OrganizationRouter.use("/:org_id/groups", GroupRouter);

export default OrganizationRouter;