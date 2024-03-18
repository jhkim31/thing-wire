import { NextFunction, Request, Response } from 'express';
import { BadRequestError, RedisError } from 'shared/Error';

import redisClient from '@redis';

import postCommandResults from './postCommandResults';
import logger from '@logger';
import createResponseMessage from 'shared/lib/createResponseMessage';

/**
 * 클라이언트가 요청한 명령 수행 결과를 가져온다.
 * 
 * redis에 특정한 키로 저장된 명령 수행 결과를 가져온다.
 *
 * **client(was) 가 호출.** 
 * 
 * * ## parameter
 * @param req deviceId, resultId
 * @param res command result
 * @param next
 * 
 * ## ref
 * * {@link postCommandResults} : device가 수행한 결과를
 */
export default async function getCommandResults(req: Request, res: Response, next: NextFunction) {
    try {        
        const deviceId = req.params.device_id;
        const resultId = req.params.result_id;

        console.log(deviceId, resultId);
    
        if (typeof deviceId !== "string" || typeof resultId !== "string") {
            throw new BadRequestError(`device_id or resultId 가 잘못되었습니다 : ${deviceId}, ${resultId}`);
        }        

        
        const commandResultStr = await redisClient.get(`${deviceId}_${resultId}`);        
        if (commandResultStr == null){
            throw new RedisError(`key [${deviceId}_${resultId}] is empty`);
        }        
        const commandResultJson = JSON.parse(commandResultStr);

        logger.debug(`${deviceId}가 수행한 명령 결과  ${JSON.stringify(commandResultJson, null, 4)}`);

        res.status(200).send(createResponseMessage('success', 'success', commandResultJson));
    } catch (err: unknown) {
        next(err);
    }

}