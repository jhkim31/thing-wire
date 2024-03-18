import { NextFunction, Request, Response } from 'express';

import addDevicesToGroup from './addDevicesToGroup';
import addDevicesToOrganization from './addDevicesToOrganization';
import getAllDevices from './getAllDevices';
import getGroupDevices from './getGroupDevices';
import getGroupDevicesData from './getGroupDevicesData';
import getSystemData from './getSystemData';
import getTsdbData from './getTsdbData';
import postComment from './postComment';
import postDevice from './postDevice';
import postCommands from './postCommands';
import uploadFile from './uploadFile';
import getOrganizationDevices from './getOrganizationDevices';
import getDevice from './getDevice';

/**
 * Device Controller
 * 
 * ## Method
 * 
 */
export default class DeviceController {
    static async getAllDevices(req: Request, res: Response, next: NextFunction) {
        return await getAllDevices(req, res, next);
    }
    
    static async addDevicesToOrganization(req: Request, res: Response, next: NextFunction) {
        return await addDevicesToOrganization(req, res, next);
    }

    static async getOrganizationDevices(req: Request, res: Response, next: NextFunction) {
        return await getOrganizationDevices(req, res, next);
    }

    static async addDevicesToGroup(req: Request, res: Response, next: NextFunction) {
        return await addDevicesToGroup(req, res, next);
    }

    static async getGroupDevices(req: Request, res: Response, next: NextFunction) {
        return await getGroupDevices(req, res, next);
    }

    static async getGroupDevicesData(req: Request, res: Response, next: NextFunction) {
        return await getGroupDevicesData(req, res, next);
    }
    
    static async postDevice(req: Request, res: Response, next: NextFunction) {
        return await postDevice(req, res, next);
    }

    static async postComment(req: Request, res: Response, next: NextFunction) {
        return await postComment(req, res, next);
    }

    static async postCommands(req: Request, res: Response, next: NextFunction) {
        return await postCommands(req, res, next);
    }

    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        return await uploadFile(req, res, next);
    }

    static async getSystemData(req: Request, res: Response, next: NextFunction) {
        return await getSystemData(req, res, next);
    }

    static async getTsdbData(req: Request, res: Response, next: NextFunction) { 
        return await getTsdbData(req, res, next);
    }

    static async getDevice(req: Request, res: Response, next: NextFunction) { 
        return await getDevice(req, res, next);
    }
}