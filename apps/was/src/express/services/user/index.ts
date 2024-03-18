import IUser from 'shared/interface/user/IUser';

import getMembersInOrg from './getMembersInOrg';
import getUser from './getUser';

/**
 * User Service
 * ## method
 * * getUser 
 * * getMembersInOrg
 */

export default class UserService {
    static async getUser(userId: string): Promise<IUser> {    
        return await getUser(userId);
    }

    static async getMembersInOrg(orgId: string): Promise<IUser[]> {    
        return await getMembersInOrg(orgId);
    }
}