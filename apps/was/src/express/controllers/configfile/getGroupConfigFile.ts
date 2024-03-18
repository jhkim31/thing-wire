import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import IConfigFile from 'shared/interface/configfile/IConfigFile';
import createResponseMessage from 'shared/lib/createResponseMessage';

import ConfigFileService from '@services/configfile';

export default async function getGroupConfigFile(req: Request, res: Response, next: NextFunction) {
    try {
        const orgId = req.params.org_id;
        const groupId = req.params.group_id;
        const configfile_id = req.params.configfile_id;        

        const configFile: IConfigFile = await ConfigFileService.getGroupConfigFile(groupId, configfile_id);        
        return res.status(200).json(createResponseMessage("success", "success", configFile ));
    } catch (error: any) {
        next(error);
    }
}