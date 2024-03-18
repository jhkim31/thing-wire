import IGroup from 'shared/interface/group/IGroup';
import IDataTable from 'shared/interface/ui/IDataTable';

import deleteGroup from './deleteGroup';
import getOrganizationGroupsDetail from './getOrganizationGroupsDetail';
import getOrganizationGroupsSimple from './getOrganizationGroupsSimple';
import postGroup from './postGroup';
import getGroup from './getGroup';

export default class GroupService {
    static async getOrganizationGroupsSimple(orgId: string): Promise<IGroup[]> {    
        return await getOrganizationGroupsSimple(orgId);
    }
    
    static async getOrganizationGroupsDetail(orgId: string): Promise<IDataTable> {    
        return await getOrganizationGroupsDetail(orgId);
    }

    static async postGroup(groupId: string, groupName: string, orgId: string) {
        return await postGroup(groupId, groupName, orgId);
    }

    static async deleteGroup(orgId: string, groupId: string) {    
        return await deleteGroup(orgId, groupId);
    }

    static async getGroup(groupId: string) {    
        return await getGroup(groupId);
    }
}