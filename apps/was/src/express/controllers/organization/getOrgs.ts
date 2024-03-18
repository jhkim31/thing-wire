import { NextFunction, Request, Response } from 'express';
import { InvalidTokenError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import logger from '@logger';
import OrgService from '@services/organization';
import IDataTable from 'shared/interface/ui/IDataTable';
import IOrganization from 'shared/interface/organization/IOrganization';

/**
 * 유저가 속한 모든 조직리스트 리턴.
 */
export default async function getOrgs(req: Request, res: Response, next: NextFunction) {

    try {
        const isDetail = req.query.detail;
        const jwtPayload = res.locals.payload;

        if (jwtPayload?.id == undefined) {
            throw new InvalidTokenError("token payload error");
        }

        if (isDetail == "true") {
            const orgDataTable: IDataTable = await OrgService.getOrgsDetail(jwtPayload.id);
            logger.info(`orgs 정보 제공\n${JSON.stringify(orgDataTable, null, 4)}`)
            return res.status(200).json(createResponseMessage("success", "Get User's Organizations", orgDataTable));
        } else {
            const orgInfos: IOrganization[] = await OrgService.getOrgsSimple(jwtPayload.id);
            logger.info(`orgs 정보 제공\n${JSON.stringify(orgInfos, null, 4)}`)
            return res.status(200).json(createResponseMessage("success", "Get User's Organizations", orgInfos));
        }
    } catch (error: unknown) {
        next(error);
    }
}