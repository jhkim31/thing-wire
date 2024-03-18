import { NextFunction, Request, Response } from "express";
import wasApi from "@api/was";
import statusHandler from "shared/lib/axios/statusHandler";
import createResponseMessage from "shared/lib/createResponseMessage";
import { BadRequestError } from "shared/Error/";
import logger from "@logger";

export default async function postDevice(req: Request, res: Response, next: NextFunction) {
    try {
        let deviceId = "";
        if (req.params.device_id === "test") {
            deviceId = Math.random().toString();    
        } else {
            deviceId = req.params.device_id;    
        }
        
        const deviceType = req.body.type as number;

        if (typeof deviceType !== "number") {
            throw new BadRequestError(`type is not number ${deviceType}`);
        }

        if (typeof deviceType !== "number") {
            throw new BadRequestError(`type is not number`);
        }

        await wasApi.post(`/devices/${deviceId}`, { type: deviceType })
            .then(d => statusHandler(d));

        logger.debug(`장치 등록 성공 ${deviceId}`);
            
        res.status(200).json(createResponseMessage("success", "success", {}));
    } catch (err: unknown) {
        next(err);
    }
}