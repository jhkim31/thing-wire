import IUser from 'shared/interface/user/IUser';
import UserDal from 'src/express/dals/user';

import { User } from '@db/models';
import logger from '@logger';
import { UserParser } from '@db/parser';

/**
 * 특정 Organization에 속한 유저 리스트를 IUser 형태로 제공.
 * @param userId 
 * @param orgId 
 * @returns 
 */
export default async function getMembersInOrg(orgId: string): Promise<IUser[]>{    
    const users: User[] = await UserDal.getMembersInOrg(orgId);
    const userInfos: IUser[] = users.map(user => UserParser(user));
    
    logger.trace(`orgId : ${orgId} 에 속한 유저들\n${JSON.stringify(userInfos, null, 4)}`);
    return userInfos;
}