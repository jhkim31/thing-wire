import ICustomJWTPayload from 'shared/interface/jwt/ICustomPayload';

import { getTokenPayload } from '@middlewares/jwt';

import jwtLogin from './jwtLogin';

export default class AuthService {
    static async jwtLogin(userAuthCredentialsBase64: string): Promise<string> {    
        return await jwtLogin(userAuthCredentialsBase64);
    }

    static getTokenPayload(token: string): ICustomJWTPayload {        
        return getTokenPayload(token);
    }
}