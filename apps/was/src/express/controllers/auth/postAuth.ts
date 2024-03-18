import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import logger from '@logger';
import AuthService from '@services/auth';

/**
 * 최초 로그인, 사용자의 계정정보를 보내고, JWT 토큰을 쿠키형태로 발급함.
 * 
 * @throws {AuthenticationError}
 */
export default async function postAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    try {                
        if (authorization == undefined) {
            throw new AuthenticationError("인증 헤더가 비었습니다.");
        }

        const [authType, credentials] = authorization.split(" ");
        if (authType != "basic") {
            throw new AuthenticationError(`인증 헤더 타입이 잘못되었습니다. "${authType}" is not basic`);
        }

        const token = await AuthService.jwtLogin(credentials);
        res.cookie("Authorization", `bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });        
        return res.status(200).json(createResponseMessage("success", "login success", {}));
    } catch (error: unknown) {                               
        next(error);
    }
}
