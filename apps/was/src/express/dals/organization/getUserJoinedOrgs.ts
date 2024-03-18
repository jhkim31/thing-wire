import { BadRequestError } from 'shared/Error';

import { ConfigFile, Device, Group, Organization, Role, User } from '@db/models';
import logger from '@logger';

/**
 * user가 속한 모든 organization을 리턴.
 * @param userId
 * @returns
 */
export default async function getUserJoinedOrgs(userId: string): Promise<Organization[]> {
    const user = await User.findOne({
        where: { id: userId },
        include: [
            {
                model: Organization,
                as: "orgs",
                include: [
                    {
                        model: User,
                        as: "owner",
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: Group,
                        as: "groups",
                    },
                    {
                        model: User,
                        as: "users",
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: Device,
                        as: "devices",
                    },
                    {
                        model: Role,
                        as: "roles",
                    },                    
                ],
            },
        ],
    });

    if (user == null) {
        throw new BadRequestError(`Get User Joined Orgs 오류 : invalid user ${userId}`);
    }

    logger.trace(`user : ${userId} 가 속한 모든 조직 : ${(user.orgs ?? [] ).map(org => org.name)}`);

    return user.orgs ?? [];
}
