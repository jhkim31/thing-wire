import { NextFunction, Request, Response } from 'express';
import { AJVError } from 'shared/Error';
import IGroup from 'shared/interface/group/IGroup';
import ICustomJWTPayload from 'shared/interface/jwt/ICustomPayload';
import createResponseMessage from 'shared/lib/createResponseMessage';
import { v4 as uuid } from 'uuid';

import ajv from '@ajv';
import GroupService from '@services/group';

export default async function postGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId = uuid();
        const groupName = req.body.name;
        const orgId = req.body.orgId;
        const jwtPayload = res.locals.payload as ICustomJWTPayload;

        const validate = ajv.getSchema<ICustomJWTPayload>("jwt.CustomPayload");

        if (!validate){
            throw new AJVError(`jwt.CustomPayload schema is not defined`);
        }

        if (!validate(jwtPayload)) {
            throw new AJVError(`jwt payload is not match schema`);
        }
        
        const group: IGroup = await GroupService.postGroup(groupId, groupName, orgId);
        res.status(200).json(createResponseMessage("success", "success", { group }));
    } catch (error: any) {
        next(error);
    }
}