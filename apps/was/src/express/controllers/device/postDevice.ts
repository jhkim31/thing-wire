import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';
import IDevice from 'shared/interface/device/IDevice';

export default async function postDevice(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const deviceType = req.body.type as number;        
        
        if (typeof deviceType !== "number") {
            throw new BadRequestError(`type is not number ${deviceType}`);
        }

        if (typeof deviceId !== "string") {
            throw new BadRequestError("deviceId is Empty");
        }
        const device: IDevice = await DeviceService.postDevice(deviceId, deviceType);        
        logger.debug(`device가 등록되었습니다. \n${JSON.stringify(device, null, 4)}`);
        return res.status(200).json(createResponseMessage("success", "success", { device }));
    } catch (error: any) {
        next(error);
    }
}