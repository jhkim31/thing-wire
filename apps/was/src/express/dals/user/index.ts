import { User } from '@db/models';

import getMembersInOrg from './getMembersInOrg';
import getUser from './getUser';
import verifyUser from './verifyUser';

/**
 * User Data Access Layer
 * @method verifyUser
 * @method getUser
 * @method getMembersInOrg
 * 
 */
class UserDal {
/**
 * id와 pw를 받아 rdb의 유저를 검증하는 메소드
 * 
 * @param userId 
 * @param userPw 
 * @returns {User} user
 * 
 * @throws {InvalidError}
 */
    static async verifyUser(userId: string, userPw: string): Promise<User> {
        return await verifyUser(userId, userPw);
    }
/**
 * userId를 받아 유저를 리턴하는 메소드
 * 
 * @param userId 
 * @returns {User} user
 * 
 * @throws {InvalidError}
 */
    static async getUser(userId: string): Promise<User> {
        return await getUser(userId);
    }

/**
 * 특정 조직에 속한 유저들 리턴.
 * @param userId 
 * @returns 
 */
    static async getMembersInOrg(orgId: string): Promise<User[]> {
        return await getMembersInOrg(orgId);
    }
}

export default UserDal;