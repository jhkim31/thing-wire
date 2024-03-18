import { AJVError } from 'shared/Error';
import IUserAuth from 'shared/interface/auth/IUserAuth';
import parseJsonString from 'shared/lib/parseJsonString';
import UserDal from 'src/express/dals/user';

import ajv from '@ajv';
import logger from '@logger';
import { createToken } from '@middlewares/jwt';

/**
 * Base64로 인코딩된 유저 정보를 받아 jwt을 리턴한다.
 * @param userAuthCredentialsBase64 
 * @returns jwt
 * 
 * @throws {SyntaxError, }
 */
export default async function jwtLogin(userAuthCredentialsBase64: string): Promise<string> {    
    const decodedAuthString = Buffer.from(userAuthCredentialsBase64, "base64").toString("utf-8")
    const validate = ajv.getSchema<IUserAuth>("UserAuth");

    if (validate == undefined) {
        throw new AJVError(`ajv get schema error : UserAuth`);
    }

    const userAuth = parseJsonString(decodedAuthString, validate);

    const id = userAuth.id;
    const pw = userAuth.pw;        
    
    const user = await UserDal.verifyUser(id, pw);    
    logger.info(`로그인 성공 ${user.name}`);    
    const token = createToken(user);
    return token;
}
