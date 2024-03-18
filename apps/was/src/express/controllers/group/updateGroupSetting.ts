import { NextFunction, Request, Response } from 'express';
import { AJVError } from 'shared/Error';
import IGroup from 'shared/interface/group/IGroup';
import ICustomJWTPayload from 'shared/interface/jwt/ICustomPayload';
import createResponseMessage from 'shared/lib/createResponseMessage';
import { v4 as uuid } from 'uuid';

import ajv from '@ajv';
import GroupService from '@services/group';

export default async function updateGroupSetting(req: Request, res: Response, next: NextFunction) {
    try {        
        const orgId = req.params.org_id;
        const groupId = req.params.group_id;
        const query = req.query;

        if (typeof query.configgroup === 'string') {
            return res.status(200).json(createResponseMessage("success", "success", {}));
        }
        
        return res.status(200).json(createResponseMessage("success", "success", {}));
    } catch (error: any) {
        next(error);
    }
}