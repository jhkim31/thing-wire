import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import IDataTable from 'shared/interface/ui/IDataTable';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';
import IDevice from 'shared/interface/device/IDevice';

export default async function getOrganizationDevices(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const isDetail = req.query.detail;

        if (!orgId) {
            throw new BadRequestError(`org_id is empty`);
        }

        if (isDetail) {
            const dataTable: IDataTable = await DeviceService.getOrganizationDevicesDetail(orgId);
            logger.debug(`org : ${orgId} 의 devices (detaul)\n${JSON.stringify(dataTable, null, 4)}`);
            return res.status(200).json(createResponseMessage("success", "success", dataTable));
        } else {
            const deviceInfos: IDevice[] = await DeviceService.getOrganizationDevicesSimple(orgId);
            logger.debug(`org : ${orgId} 의 devices\n${JSON.stringify(deviceInfos, null, 4)}`);
            return res.status(200).json(createResponseMessage("success", "success", deviceInfos));
        }
    } catch (error: any) {
        next(error);
    }
}