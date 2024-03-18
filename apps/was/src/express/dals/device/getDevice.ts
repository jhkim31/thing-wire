import { BadRequestError } from 'shared/Error';

import { Device } from '@db/models';

export default async function getDevice(deviceId: string){
    const device = await Device.findByPk(deviceId);        
    if (device == null){
        throw new BadRequestError(`wrong device id ${deviceId}`);        
    }

    return device;    
}
