import { NextFunction, Request, Response } from 'express';

import api from '@api/device-manager';
import DeviceService from '@services/device';
import statusHandler from 'shared/lib/axios/statusHandler';
import createResponseMessage from 'shared/lib/createResponseMessage';
import { Device } from '@db/models';
import logger from '@logger';
import IDevice from 'shared/interface/device/IDevice';

export default async function getSystemData(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;        
        const systemdata = await api
            .get(`devices/${deviceId}/systemdata`)
            .then((d) => {
                const checkstatus = statusHandler<any>(d);
                return checkstatus;
            });
        const deviceInfo: IDevice = await DeviceService.getDevice(deviceId);
        res.status(200).json(createResponseMessage('success', 'success', { state: systemdata, info: deviceInfo, id: deviceId}));
    } catch (error) {
        next(error);
    }
}