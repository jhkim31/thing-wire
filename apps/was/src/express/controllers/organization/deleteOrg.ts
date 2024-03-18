import { NextFunction, Request, Response } from 'express';
import createResponseMessage from 'shared/lib/createResponseMessage';

import OrgService from '@services/organization';
import { InvalidTokenError } from 'shared/Error';


export default async function deleteOrg(req: Request, res: Response, next: NextFunction){
    const orgId = req.params.org_id;    
    try{               
        const jwtPayload = res.locals.payload;
        if (typeof jwtPayload.id !== "string") {
            throw new InvalidTokenError(`payload is invalid\n${JSON.stringify(jwtPayload)}`);
        }
        const result: boolean = await OrgService.deleteOrg(jwtPayload.id, orgId);

        res.status(200).json(createResponseMessage("success", "delete Organization", result));
    } catch(error: any) {        
        next(error);
    }
}
