import { Group } from '@db/models';
import logger from '@logger';

export default async function postGroup(groupId: string, groupName: string, orgId: string): Promise<Group> {
    const newGroup = await Group.create({ id: groupId, name: groupName, orgId: orgId, isConfigGroup: false });

    logger.trace(`새 그룹이 생성되었습니다. \n${JSON.stringify(newGroup, null, 4)}`);
    return newGroup;
}