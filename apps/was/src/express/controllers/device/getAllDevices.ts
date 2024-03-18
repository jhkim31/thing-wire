import { NextFunction, Request, Response } from 'express';
import IDataTable from 'shared/interface/ui/IDataTable';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';

export default async function getAllDevices(req: Request, res: Response, next: NextFunction) {
    try {        
        const isDetail = req.query.detail;
        if (isDetail){
            const dataTable: IDataTable = await DeviceService.getAllDevices();            
            return res.status(200).json(createResponseMessage("success", "success", dataTable));
        } else {

        }             
    } catch (error: any) {
        next(error);
    }
}
