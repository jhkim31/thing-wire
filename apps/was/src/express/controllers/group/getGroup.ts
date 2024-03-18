import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import GroupService from '@services/group';
import logger from '@logger';
import IGroup from 'shared/interface/group/IGroup';

export default async function getGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const groupId = req.params.group_id;
        if (groupId === "" || orgId === "") {
            throw new BadRequestError(`org_id | group_id is empty`);
        }

        const groupInfo: IGroup = await GroupService.getGroup(groupId);        
        return res.status(200).json(createResponseMessage("success", "success", groupInfo ));
    } catch (error: any) {
        next(error);
    }
}