import { NextFunction, Request, Response } from 'express';

import getOrganizationMembers from './getOrganizationMembers';

/**
 * User Controller
 * 
 * ## Method
 * * getMembersInOrg
 * 
 */
export default class UserController {
    static async getOrganizationMembers(req: Request, res: Response, next: NextFunction) {
        await getOrganizationMembers(req, res, next);
    }
}