import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';
import IDataTable from 'shared/interface/ui/IDataTable';
import IDevice from 'shared/interface/device/IDevice';

export default async function getGroupDevices(req: Request, res: Response, next: NextFunction) {
    try {        
        const groupId = req.params.group_id;

        if (!groupId){
            throw new BadRequestError(`group_id is empty`);
        }

        const isDetail = req.query.detail;
        if (isDetail) {
            
        } else {
            const deviceInfos: IDevice[] = await DeviceService.getGroupDevicesSimple(groupId);        
            logger.debug(`${groupId} 의 devices\n${JSON.stringify(deviceInfos, null, 4)}`);
            return res.status(200).json(createResponseMessage("success", "success", deviceInfos));
        }
    } catch (error: any) {
        next(error);
    }
}
