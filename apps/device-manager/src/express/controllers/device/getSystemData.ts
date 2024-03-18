import { NextFunction, Request, Response } from "express";
import redisClient from "@redis";
import { RedisError } from "shared/Error";
import createResponseMessage from "shared/lib/createResponseMessage";
import logger from "@logger";

export default async function getSystemData(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;  
        const resultStr = await redisClient.get(`${deviceId}_systemdata`);

        if (resultStr == null) {
            throw new RedisError(`key [${deviceId}_systemdata] is null`);
        }

        const resultJson = JSON.parse(resultStr);
        logger.debug(`${deviceId}의 system data \n${JSON.stringify(resultJson, null, 4)}`);
        res.status(200).json(createResponseMessage("success", "success", resultJson));
    } catch (err: unknown) {
        next(err);
    }
}