import { BadRequestError } from 'shared/Error';

import { Group, GroupDevice } from '@db/models';

export default async function addDevicesToGroup(groupId: string, deviceIds: string[]): Promise<boolean> {    
    const group = Group.findByPk(groupId);
    if (group == null) {
        throw new BadRequestError(`groupId 가 잘못되었습니다. ${groupId}`);
    }

    for (const deviceId of deviceIds) {        
        await GroupDevice.create({ groupId: groupId, deviceId: deviceId });
    }
    return true;
}