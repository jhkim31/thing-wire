import assert from 'assert';
import { Router } from 'express';

import AuthRouter from './auth.router';
import ConfigRouter from './config.router';
import DeviceDefaultRouter from './device/device.default.router';
import OrganizationRouter from './org.router';

const WAS_VERSION = process.env.WAS_VERSION as string;
assert.strictEqual(typeof WAS_VERSION, "string", "WAS_VERSION (이)가 선언되지 않았습니다.");

/**
 * ## API Router
 * ### `/api`
 * * /auth : AuthRouter
 * * /orgs : OrganizationRouter
 * * /devices : DeviceDefaultRouter
 * * /config : ConfigRouter
*/
const ApiRouter = Router({mergeParams: true});

ApiRouter.use(`/${WAS_VERSION}/auth`, AuthRouter);
ApiRouter.use(`/${WAS_VERSION}/orgs`, OrganizationRouter);
ApiRouter.use(`/${WAS_VERSION}/devices`, DeviceDefaultRouter);
ApiRouter.use(`/${WAS_VERSION}/config`, ConfigRouter);

export default ApiRouter;
