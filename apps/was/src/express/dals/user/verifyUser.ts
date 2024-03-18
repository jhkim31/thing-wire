import { InvalidError } from 'shared/Error';

import { User } from '@db/models';
import logger from '@logger';

export default async function verifyUser(userId: string, userPw: string): Promise<User> {
    const user = await User.findOne({ where: { id: userId } });
    if (user == null) {
        logger.error(`unregisted user : ${userId}`);
        throw new InvalidError("Unregistered ID or ID, PW mis-match");
    }
    const isValidUser = await user.comparePassword(userPw);

    if (isValidUser) {
        logger.trace(`valid user : ${userId}`);        
        return user;
    } else {
        logger.trace(`invalid user : ${userId}`);
        throw new InvalidError("Unregistered ID or ID, PW mis-match");
    }
}