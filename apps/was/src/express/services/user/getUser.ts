import UserDal from 'src/express/dals/user';
import IUser from 'shared/interface/user/IUser';
import { UserParser } from '@db/parser';

/**
 * UserId를 받아 유저 정보(객체)를 리턴.
 * @param userId 
 * @returns 
 */
export default async function getUser(userId: string): Promise<IUser>{    
    const user = await UserDal.getUser(userId);
    const userInfo: IUser = UserParser(user);
    return userInfo;
}
