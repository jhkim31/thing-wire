import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';
import IDataTable from 'shared/interface/ui/IDataTable';

export default async function getGroupDevicesData(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId = req.params.group_id;
        if (!groupId) {
            throw new BadRequestError(`group_id is empty`);
        }
        const groupDeviceDatas: IDataTable = await DeviceService.getGroupDevicesData(groupId);
        logger.debug(`${groupId}에 속한 장치정보 ${JSON.stringify(groupDeviceDatas, null, 4)}`);
        return res.status(200).json(createResponseMessage("success", "success", groupDeviceDatas));
    } catch (error: any) {
        next(error);
    }
}
