import IOrganization from 'shared/interface/organization/IOrganization';
import IDataTable from 'shared/interface/ui/IDataTable';

import deleteOrg from './deleteOrg';
import getOrgsDetail from './getOrgsDetail';
import getOrgsSimple from './getOrgsSimple';
import postOrg from './postOrg';
import deleteOrgs from './deleteOrgs';

/**
 * Organization Service
 * ## method
 * * getOrgsSimple 
 * * getOrgsDetail
 * * postOrg
 * * deleteOrg
 */

export default class OrgService {
    static async getOrgsSimple(userId: string): Promise<IOrganization[]> {            
        return await getOrgsSimple(userId);
    }

    static async getOrgsDetail(userId: string): Promise<IDataTable>{
        return await getOrgsDetail(userId);
    }

    static async postOrg(orgId: string, orgName: string, userId: string) {
        return await postOrg(orgId, orgName, userId);
    }

    static async deleteOrg(userId: string, orgId: string) {
        return await deleteOrg(userId, orgId);
    }

    static async deleteOrgs(userId: string, orgIds: string[]) {
        return await deleteOrgs(userId, orgIds);
    }
}