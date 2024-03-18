import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import GroupService from '@services/group';
import logger from '@logger';

export default async function deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const groupId = req.params.group_id;
        if (groupId === "" || orgId === "") {
            throw new BadRequestError(`org_id | group_id is empty`);
        }

        const deleteGroup: boolean = await GroupService.deleteGroup(orgId, groupId);
        logger.debug(`${groupId}가 삭제되었습니다.`); 
        return res.status(200).json(createResponseMessage("success", "success", { result: deleteGroup }));
    } catch (error: any) {
        next(error);
    }
}