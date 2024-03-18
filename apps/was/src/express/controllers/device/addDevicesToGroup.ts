import { NextFunction, Request, Response } from 'express';
import { AJVError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import ajv from '@ajv';
import DeviceService from '@services/device';
import logger from '@logger';

export default async function addDevicesToGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId = req.params.group_id;
        const deviceIds = req.body.devices as string[];

        const validate = ajv.getSchema("StringArray")

        if (validate == undefined) {
            throw new AJVError(`ajv get schema error : StringArray`);
        }

        const isValid = validate(deviceIds);
        if (!isValid) {
            throw new AJVError("deviceId가 StringArray타입이 아닙니다.");
        }

        const result: boolean = await DeviceService.addDevicesToGroup(groupId, deviceIds);       
        logger.debug(`${JSON.stringify(deviceIds)} 가 ${groupId}에 추가되었습니다.`);
        return res.status(200).json(createResponseMessage("success", "success", {result}));
    } catch (error: any) {
        next(error);
    }
}