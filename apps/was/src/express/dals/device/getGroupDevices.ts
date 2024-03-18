import { BadRequestError } from 'shared/Error';

import { Device, Group } from '@db/models';

export default async function getGroupDevices(groupId: string): Promise<Device[]> {
    const devices = await Device.findAll({include: [
        {
            model: Group,
            where: {id: groupId}
        }
    ]})
    
    if (devices == null){
        throw new BadRequestError("Wrong group Id ");
    }

    return devices;
}