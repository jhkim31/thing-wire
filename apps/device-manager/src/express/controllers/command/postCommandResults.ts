import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';
import getCommandResults from './getCommandResults';
import redisClient from '@redis';
import logger from '@logger';

/**
 * device가 명령 수행의 결과를 서버에 저장.
 * 
 * redis에 특정한 키로 명령 수행 결과(json)를 문자열 형태로 저장 
 *
 * **device가 호출.** 
 * 
 * * ## parameter
 * @param req deviceId, commands
 * @param res {}
 * @param next
 * 
 * ## ref
 * * {@link getCommandResults} : device가 수행한 결과를
 */
export default async function postCommandResults(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const commandResults = req.body.commands;

        if (!(commandResults instanceof Array)) {
            throw new BadRequestError(`command result type is not Array`);
        }

        for (const commandResult of commandResults) {
            const result = commandResult.result;
            console.log(result);
            await redisClient.set(`${deviceId}_${commandResult.resultId}`, JSON.stringify({command : commandResult.command, result: commandResult.result}));
        }

        logger.debug(`${deviceId}의 명령 수행 결과\n${JSON.stringify(commandResults, null, 4)}`);
        res.status(200).json(createResponseMessage("success", "success", {}));
    } catch (err: unknown) {
        next(err);
    }

}