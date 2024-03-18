import { SequelizeError } from 'shared/Error';

import sequelize from '@db/index';
import { Organization, User } from '@db/models';
import logger from '@logger';

export default async function deleteOrgs(userId: string, orgIds: string[]) {
    const transaction = await sequelize.transaction();
    try {
        for (const orgId of orgIds) {
            const organization = await Organization.findByPk(orgId, { include: [{ model: User, as: "owner" }], transaction });
            if (organization == null) {
                throw new SequelizeError(`Organization 삭제 오류 : invalid orgId : ${orgId}`);
            }

            if (organization.ownerId == userId) {
                await organization.destroy({transaction});
                logger.trace(`org ${organization.name} 가 삭제되었습니다.`);
            } else {
                throw new SequelizeError(`자신이 owner인 조직만 삭제할 수 있습니다 : owner ${organization.ownerId} | userId : ${userId}`);
            }
        }
        await transaction.commit();
        return true;
    } catch (error: unknown) {
        await transaction.rollback();
        throw error;
    }
}
