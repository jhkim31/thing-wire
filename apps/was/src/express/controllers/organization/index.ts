import { NextFunction, Request, Response } from 'express';

import deleteOrg from './deleteOrg';
import getOrgs from './getOrgs';
import postOrg from './postOrg';
import deleteOrgs from './deleteOrgs';

/**
 * Org Controller
 * 
 * ## Method
 * * postAuth
 * * getUser
 * 
 */
export default class OrgController {
    static async getOrgs(req: Request, res: Response, next: NextFunction) {    
        await getOrgs(req, res, next);
    }

    static async postOrg(req: Request, res: Response, next: NextFunction) {    
        await postOrg(req, res, next);
    }

    static async deleteOrg(req: Request, res: Response, next: NextFunction) {    
        await deleteOrg(req, res, next);
    }

    static async deleteOrgs(req: Request, res: Response, next: NextFunction) {    
        await deleteOrgs(req, res, next);
    }
}