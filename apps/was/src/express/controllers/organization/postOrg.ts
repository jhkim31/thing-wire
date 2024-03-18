import { NextFunction, Request, Response } from 'express';
import { InvalidTokenError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';
import { v4 as uuid } from 'uuid';

import logger from '@logger';
import OrgService from '@services/organization';
import IOrganization from 'shared/interface/organization/IOrganization';

/**
 * 조직 등록
 * @param req 
 * @param res 
 * @param next 
 */
export default async function postOrg(req: Request, res: Response, next: NextFunction){
    const orgId = uuid();
    const orgName = req.body.name;
    try{        
        const jwtPayload = res.locals.payload;

        if (jwtPayload?.id == undefined){
            throw new InvalidTokenError("token payload error");            
        }                

        const organization: IOrganization = await OrgService.postOrg(orgId, orgName, jwtPayload.id);        

        logger.info(`org 생성 완료\n${JSON.stringify(organization, null, 4)}`);
        res.status(200).json(createResponseMessage("success", "Post New Organizations", {org: organization}));
    } catch(error: any) {                
        next(error);
    }
}