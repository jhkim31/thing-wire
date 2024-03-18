import { NextFunction, Request, Response } from 'express';
import { AJVError, BadRequestError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import ajv from '@ajv';
import api from '@api/device-manager';
import logger from '@logger';
import statusHandler from "shared/lib/axios/statusHandler";
import IResponseMessage from 'shared/interface/IResponseMessage';


export default async function postCommands(req: Request, res: Response, next: NextFunction) {
    try {
        const deviceId = req.params.device_id;
        const commandType = req.body.type;
        const deviceCommand = req.body.command;

        if (commandType !== "command" || typeof deviceCommand !== "string") {
            throw new BadRequestError(`commandType or deviceCommand is wrong ${commandType}, ${deviceCommand}`);
        }
        const a = await api.get<string>('/test')
        .then(d => {
            const b = d.data;
            console.log(d.data);
        })

        const postCommandsResult = await api
            .post(`/devices/${deviceId}/commands`, req.body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((d) => {
                const postCommandsResult = statusHandler<{ resultId: string }>(d);
                return postCommandsResult;
            });
        const resultId = postCommandsResult.resultId;   
             
        let retryCount = 10;
        const intervalId = setInterval(() => {
            api.get(`/devices/${deviceId}/commands/${resultId}`)
            .then(d => {
                const commandResult = statusHandler<{command: string; result: string;}>(d);
                logger.warn(commandResult);
                clearInterval(intervalId);
                return res.status(200).send(createResponseMessage('success', 'success', commandResult));
            })
            .catch(e => {
                logger.error(e.message);
                retryCount--;
                if (retryCount <= 0){
                    clearInterval(intervalId);
                    next(new Error("test!!!!!"));
                } 
            })            
        }, 3000);
    } catch (error: any) {        
        next(error);
    }
}