import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';
import { v4 as uuid } from 'uuid';

import logger from '@logger';
import redisClient from '@redis';

/**
 * client가 device에게 보낼 명령 post.
 * 
 * 명령을 redis에 특정한 키로 저장
 * 
 * **client(was)가 요청함.**
 * 
 * ## parameter
 * @param req deviceId
 * @param res resultId
 * 
 * ## ref
 * * {@link getCommands} device가 클라이언트가 자신에게 보낸 명령어를 가져감.
 */
export default async function postCommands(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const deviceCommand = req.body.command;
        const commandType = req.body.type;

        if (commandType !== "command" || typeof deviceCommand !== "string") {
            throw new BadRequestError(`commandType or deviceCommand is wrong ${commandType}, ${deviceCommand}`);
        }

        const resultId = uuid();

        await redisClient.rPush(
            `${deviceId}_command`,
            JSON.stringify({
                type: commandType,
                resultId: resultId,
                command: deviceCommand,
            })
        );

        const result = await redisClient.lRange(`${deviceId}_command`, 0, -1);

        logger.debug(`${deviceId}에게 보낼 명령 저장 ${JSON.stringify(result)}`);
        res.status(200).json(createResponseMessage("success", "success", { resultId }));
    } catch (err: unknown) {
        next(err);
    }

}