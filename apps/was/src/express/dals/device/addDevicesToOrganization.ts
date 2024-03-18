import { BadRequestError } from 'shared/Error';

import { Organization, OrgDevice } from '@db/models';
import logger from '@logger';

export default async function addDevicesToOrganization(orgId: string, deviceIds: string[]): Promise<boolean> {

    const org = Organization.findByPk(orgId);
    if (org == null) {
        throw new BadRequestError(`orgId가 잘못되었습니다. ${orgId}`);
    }

    for (const deviceId of deviceIds) {        
        await OrgDevice.create({ orgId: orgId, deviceId: deviceId });
    }
    logger.trace(`${JSON.stringify(deviceIds)} 가 ${orgId}에 추가되었습니다.`);
        
    return true;
}
