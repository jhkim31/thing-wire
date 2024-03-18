import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import IGroup from 'shared/interface/group/IGroup';
import IDataTable from 'shared/interface/ui/IDataTable';
import createResponseMessage from 'shared/lib/createResponseMessage';

import logger from '@logger';
import GroupService from '@services/group';

export default async function getOrganizationGroups(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const isDetail = req.query.detail;
        if (!orgId) {
            throw new BadRequestError(`orgId is empty`);
        }        

        if (isDetail) {
            const dataTable: IDataTable = await GroupService.getOrganizationGroupsDetail(orgId);     
            logger.debug(`org : ${orgId} 의 groups (detaul)\n${JSON.stringify(dataTable, null, 4)}`);       
            res.status(200).json(createResponseMessage("success", "success", dataTable));
        } else {
            const groupInfos: IGroup[] = await GroupService.getOrganizationGroupsSimple(orgId);            
            logger.debug(`org : ${orgId} 의 groups \n${JSON.stringify(groupInfos, null, 4)}`);       
            res.status(200).json(createResponseMessage("success", "success", groupInfos));
        }
    } catch (error: unknown) {
        next(error);
    }
}