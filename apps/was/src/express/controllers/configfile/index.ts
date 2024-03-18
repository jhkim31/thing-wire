import { NextFunction, Request, Response } from 'express';
import getGroupConfigFiles from './getGroupConfigFiles';
import getGroupConfigFile from './getGroupConfigFile';

export default class ConfigFileController {
    static async getGroupConfigFiles(req: Request, res: Response, next: NextFunction) {
        return await getGroupConfigFiles(req, res, next);
    }

    static async getGroupConfigFile(req: Request, res: Response, next: NextFunction) {
        return await getGroupConfigFile(req, res, next);
    }
}