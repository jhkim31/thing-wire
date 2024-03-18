import { Router } from 'express';
import DeviceController from '@controllers/device';
import CommandRouter from './command.router';
import FileRouter from './file.router';

const DeviceRouter = Router({mergeParams: true});

DeviceRouter.get(`/:device_id/systemdata`, DeviceController.getSystemData);
DeviceRouter.post(`/:device_id`, DeviceController.postDevice);
DeviceRouter.use(`/:device_id/commands`, CommandRouter);
DeviceRouter.use(`/:device_id/files`, FileRouter);

export default DeviceRouter;
