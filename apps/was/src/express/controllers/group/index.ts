import { NextFunction, Request, Response } from 'express';

import deleteGroup from './deleteGroup';
import getOrganizationGroups from './getOrganizationGroups';
import postGroup from './postGroup';
import getGroup from './getGroup';
import updateGroupSetting from './updateGroupSetting';

export default class GroupController {
    static async getOrganizationGroups(req: Request, res: Response, next: NextFunction) {    
        await getOrganizationGroups(req, res, next);
    }

    static async postGroup(req: Request, res: Response, next: NextFunction) {    
        await postGroup(req, res, next);
    }

    static async deleteGroup(req: Request, res: Response, next: NextFunction) {    
        await deleteGroup(req, res, next);
    }

    static async getGroup(req: Request, res: Response, next: NextFunction) {    
        await getGroup(req, res, next);
    }

    static async updateGroupSetting(req: Request, res: Response, next: NextFunction) {    
        await updateGroupSetting(req, res, next);
    }
}