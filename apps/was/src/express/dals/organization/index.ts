import { Organization } from '@db/models';

import deleteOrg from './deleteOrg';
import getUserJoinedOrgs from './getUserJoinedOrgs';
import postOrg from './postOrg';
import deleteOrgs from './deleteOrgs';

/**
 * Organization Data Access Layer
 * @method getUserJoinedOrgs
 * @method postOrg
 * @method deleteOrg
 * 
 */
export default class OrgDal {
    static async getUserJoinedOrgs(userId: string): Promise<Organization[]>{
        return await getUserJoinedOrgs(userId);
    }
    
    static async postOrg(orgId: string, orgName: string, ownerId: string) {
        return await postOrg(orgId, orgName, ownerId);
    }

    static async deleteOrg(userId: string, orgId: string){
        return await deleteOrg(userId, orgId);
    }

    static async deleteOrgs(userId: string, orgIds: string[]){
        return await deleteOrgs(userId, orgIds);
    }
}