import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import IConfigFile from 'shared/interface/configfile/IConfigFile';
import createResponseMessage from 'shared/lib/createResponseMessage';

import ConfigFileService from '@services/configfile';

export default async function getGroupConfigFiles(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const groupId = req.params.group_id;
        if (groupId === "" || orgId === "") {
            throw new BadRequestError(`org_id | group_id is empty`);
        }

        const configFile: IConfigFile[] = await ConfigFileService.getGroupConfigFiles(groupId);        
        return res.status(200).json(createResponseMessage("success", "success", configFile ));
    } catch (error: any) {
        next(error);
    }
}