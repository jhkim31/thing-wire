import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';
import IDevice from 'shared/interface/device/IDevice';

/**
 * 특정 조직, 그룹 아래에 있는 장치 하나의 정보를 리턴함.
 * @param req 
 * @param res 
 * @param next 
 */
export default async function getDevice(req: Request, res: Response, next: NextFunction) {
    try {        
        const orgId = req.params.org_id;        
        const groupId = req.params.group_id;
        const deviceId = req.params.device_id;

        if (orgId === "" || groupId === "" || deviceId === ""){
            throw new BadRequestError(`org_id | group_id | device_id is empty`);
        }
        const deviceInfo: IDevice = await DeviceService.getDevice(deviceId);                
        res.status(200).json(createResponseMessage('success', 'success', deviceInfo));
    } catch (error: any) {
        next(error);
    }
}
