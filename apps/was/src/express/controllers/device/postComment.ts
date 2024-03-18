import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import DeviceService from '@services/device';
import logger from '@logger';

export default async function postComment(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const comment = req.body.comment;

        if (typeof deviceId !== "string" || typeof comment !== "string") {
            throw new BadRequestError("deviceId || comment is empty");
        }
        const result: boolean = await DeviceService.postComment(deviceId, comment);        
        logger.debug(`${deviceId} 에 주석이 등록되었습니다. ${comment}`);
        return res.status(200).json(createResponseMessage("success", "success", { result }));
    } catch (error: any) {
        next(error);
    }
}