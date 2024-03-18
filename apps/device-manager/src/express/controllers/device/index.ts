import { NextFunction, Request, Response } from 'express';
import postDevice from './postDevice';
import getSystemData from './getSystemData';
/**
 * Device Controller
 * 
 * ## Method
 * 
 */
export default class DeviceController {
    static async postDevice(req: Request, res: Response, next: NextFunction) {
        return await postDevice(req, res, next);
    }

    static async getSystemData(req: Request, res: Response, next: NextFunction) {
        return await getSystemData(req, res, next);
    }
}