import { NextFunction, Request, Response } from 'express';
import createResponseMessage from 'shared/lib/createResponseMessage';
import redisClient from '@redis';
import { RedisError } from 'shared/Error';
import postCommands from './postCommands';
import logger from '@logger';

/**
 * 클라이언트가 device에게 보낼 명령어를 리턴한다.  
 * 
 * redis에 저장된 명령어들을 찾아 device에게 리턴.
 *
 * **device가 호출.** 
 * 
 * * ## parameter
 * @param req deviceId
 * @param res resultId
 * @param next
 * 
 * ## ref
 * * {@link postCommands} : 클라이언트가 device에게 보낼 명령어 post
 */
export default async function getCommands(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const deviceState = req.body.state;
        await redisClient.set(`${deviceId}_systemdata`, JSON.stringify(deviceState));

        const response: any = {
            commands: [],
        };

        while (await redisClient.exists(`${deviceId}_command`)) {
            const itemStr = await redisClient.lPop(`${deviceId}_command`);
            if (itemStr == null) {
                throw new RedisError(`${deviceId}_command key lpop error ${itemStr}`);
            }
            const item = JSON.parse(itemStr);
            response.commands.push(item);
        }

        logger.debug(`${deviceId}가 가져간 명령 \n${JSON.stringify(response, null, 4)}`);
        res.status(200).json(createResponseMessage("success", "success", response));        
    } catch (err: unknown) {
        next(err);
    }

}