import { User } from "@db/models";
import IUser from "shared/interface/user/IUser";


/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 * 
 * {@link User} => {@link IUser}
 */
export default function UserParser(user: User): IUser {
    const userInfo: IUser = {
        id: user.id,
        name: user.name,
        isSA: user.isSA
    }
    return userInfo;
}