import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import UserService from '@services/user';
import logger from '@logger';
import IUser from 'shared/interface/user/IUser';

export default async function getOrganizationMembers(req: Request, res: Response, next: NextFunction) {    
    try {
        const orgId = req.params.org_id;
        if (typeof orgId !== "string"){
            throw new BadRequestError("org_id empty");            
        }

        const users: IUser[] = await UserService.getMembersInOrg(orgId);    
        logger.debug(`org : ${orgId}의 유저들 \n${JSON.stringify(users, null, 4)}`);
        return res.status(200).json(createResponseMessage("success", "success", users));
    } catch (error: unknown) {        
        next(error);
    }
}