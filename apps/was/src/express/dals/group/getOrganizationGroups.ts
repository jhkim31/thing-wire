import { BadRequestError } from 'shared/Error';

import { Device, Group, Organization } from '@db/models';
import logger from '@logger';

export default async function getOrganizationGroups(orgId: string): Promise<Group[]> {
    const organization = await Organization.findByPk(orgId, {
        include: [
            {
                model: Group,
                as: "groups",
                include: [
                    {
                        model: Device,
                        as: "devices"
                    }
                ]
            }
        ]
    });
    
    if (organization == null) {
        throw new BadRequestError(`Organization을 찾지 못했습니다 : ${orgId}`);
    }
    logger.info(JSON.stringify(organization, null, 4));
    return organization.groups ?? [];
}