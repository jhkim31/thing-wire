import { InvalidError } from 'shared/Error';

import { User } from '@db/models';
import logger from '@logger';
import IUser from 'shared/interface/user/IUser';

/**
 * userId를 받아 유저정보를 리턴
 * 
 * @param userId 
 * @returns {User} user
 * 
 * @throws {InvalidError}
 */
export default async function getUser(userId: string): Promise<User> {
    const user = await User.findByPk(userId, {attributes: { exclude: ['password'] }});    
    if (user == null){
        logger.error(`unregisted user : ${userId}`);
        throw new InvalidError("일치하는 user 없음");
    }        
    
    return user;
}
