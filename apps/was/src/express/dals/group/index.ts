import { Group } from '@db/models';

import deleteGroup from './deleteGroup';
import getOrganizationGroups from './getOrganizationGroups';
import postGroup from './postGroup';
import getGroup from './getGroup';

export default class GroupDal {
    static async getOrganizationGroups(orgId: string): Promise<Group[]> {
        return await getOrganizationGroups(orgId);
    }

    static async postGroup(groupId: string, groupName: string, orgId: string): Promise<Group> {
        return await postGroup(groupId, groupName, orgId);
    }

    static async deleteGroup(orgId: string, groupId: string): Promise<boolean> {
        return await deleteGroup(orgId, groupId);
    }

    static async getGroup(groupId: string): Promise<Group> {
        return await getGroup(groupId);
    }
}