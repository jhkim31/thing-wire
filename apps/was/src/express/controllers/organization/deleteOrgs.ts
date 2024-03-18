import { NextFunction, Request, Response } from 'express';
import createResponseMessage from 'shared/lib/createResponseMessage';

import ajv from '@ajv';
import OrgService from '@services/organization';
import { AJVError, InvalidTokenError } from 'shared/Error';


export default async function deleteOrgs(req: Request, res: Response, next: NextFunction){    
    try{               
        const orgIds = req.body.orgIds as string[];

        const validate = ajv.getSchema("StringArray");
        
        if (!validate) {
            throw new AJVError(`Get Schema Error ${"StringArray"}`);
        }

        if (!validate(orgIds)){
            throw new AJVError(`Schema is not match (StringArray)`);
        }

        const jwtPayload = res.locals.payload;
        if (typeof jwtPayload.id !== "string") {
            throw new InvalidTokenError(`payload is invalid\n${JSON.stringify(jwtPayload)}`);
        }

        const result: boolean = await OrgService.deleteOrgs(jwtPayload.id, orgIds);
        res.status(200).json(createResponseMessage("success", "delete Organizations", result));
    } catch(error: any) {        
        next(error);
    }
}
