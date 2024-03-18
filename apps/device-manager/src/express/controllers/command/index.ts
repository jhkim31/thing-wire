import { NextFunction, Request, Response } from 'express';
import postCommands from './postCommands';
import getCommands from './getCommands';
import postCommandResults from './postCommandResults';
import getCommandResults from './getCommandResults';

/**
 * Command Controller
 * 
 * ## Method
 * 
 */
export default class CommandController {
    static async postCommands(req: Request, res: Response, next: NextFunction) {
        return await postCommands(req, res, next);
    }

    static async getCommands(req: Request, res: Response, next: NextFunction) {
        return await getCommands(req, res, next);
    }

    static async postCommandResults(req: Request, res: Response, next: NextFunction) {
        return await postCommandResults(req, res, next);
    }
    static async getCommandResults(req: Request, res: Response, next: NextFunction) {
        return await getCommandResults(req, res, next);
    }
}