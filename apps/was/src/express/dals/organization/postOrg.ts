import { SequelizeError } from 'shared/Error';

import sequelize from '@db/index';
import { Organization, UserOrg } from '@db/models';

export default async function postOrg(orgId: string, orgName: string, ownerId: string) {
    const transaction = await sequelize.transaction();
    try {
        const organization = await Organization.create({ id: orgId, name: orgName, ownerId: ownerId }, {transaction});

        if (organization == null) {
            throw new SequelizeError(`[Organization 생성 오류] : orgId  ${orgId} | orgName  ${orgName} | ownerId  ${ownerId}`);
        }

        const association = await UserOrg.create({ userId: ownerId, orgId: orgId }, {transaction});
        if (association == null) {
            throw new SequelizeError(`[Organization 생성 오류] : orgId : ${orgId} | orgName : ${orgName} | ownerId : ${ownerId}`);
        }
        
        await transaction.commit();
        return organization;
    } catch (error: unknown) {
        await transaction.rollback();
        if (error instanceof Error){
            throw new SequelizeError(`Sequelize Transaction Error ${error.message}`);
        } else {
            throw new SequelizeError(`Sequelzie Transaction Error`);
        }       
    }
}