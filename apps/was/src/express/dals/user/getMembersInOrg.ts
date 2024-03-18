import { BadRequestError } from 'shared/Error';

import { Organization, User } from '@db/models';
import logger from '@logger';

/**
 * 특정 org에 속한 Users 제공.
 * @param userId 
 * @param orgId 
 * @returns 
 */
export default async function getMembersInOrg(orgId: string): Promise<User[]> {
    const organization = await Organization.findByPk(orgId, {
        include: [
            {
                model: User,
                as: "users",
                attributes: {
                    exclude: ['password']
                }
            }
        ]
    });
    if (organization == null) {
        throw new BadRequestError("일치하는 organization 없음");
    }
    const users = organization.users ?? [];
    logger.debug(`org : ${organization.name} 에 속한 users : ${users.length}명\n
    ${users.map(user => user.name)}`);
    return users;
}
