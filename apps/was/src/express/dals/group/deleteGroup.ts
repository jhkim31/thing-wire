import { BadRequestError } from 'shared/Error';

import { Group } from '@db/models';
import logger from '@logger';

export default async function deleteGroup(orgId: string, groupId: string): Promise<boolean> {
    const group = await Group.findByPk(groupId);

    if (group == null) {
        throw new BadRequestError(`group을 찾을 수 없습니다 : ${groupId}`);
    }

    if (group?.orgId == orgId) {
        group.destroy();
    } else {
        throw new BadRequestError(`group의 orgId가 잘못되었습니다. : ${group.orgId} != ${orgId}`);
    }

    logger.trace(`${groupId}가 삭제되었습니다.`);
    return true;
}