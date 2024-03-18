import { BadRequestError } from 'shared/Error';

import { ConfigFile, Group } from '@db/models';

export default async function getGroup(groupId: string): Promise<Group> {
    const group = await Group.findByPk(groupId, {include: [
        {
            model: ConfigFile,
            as: "configFile"
        }
    ]});

    if (group == null) {
        throw new BadRequestError(`group을 찾을 수 없습니다 : ${groupId}`);
    }

    
    return group;
}