import { NextFunction, Request, Response } from 'express';
import { InvalidError } from 'shared/Error';

import { verifyToken } from '@middlewares/jwt';

/**
 * api 요청이 들어오면, jwt 토큰이 검증된 토큰인지 확인.  
 * 토큰이 올바르다면 res.local 객체에 token payload를 저장하고, next함수 호출  
 * 
 * @throws {InvalidError}
 */

export default function verifyAuthPage(req: Request, res: Response, next: NextFunction) {
    const authorization = req.cookies.Authorization;
    try {      
        if (authorization == undefined) {
            throw new InvalidError("인증 쿠키가 비었습니다.");
        }

        const [authType, token] = authorization.split(" ");
        if (authType != "bearer" || !token) {
            throw new InvalidError(`인증 쿠키 타입이 잘못되었습니다. "${authType}" is not bearer`);
        }

        const tokenPayload = verifyToken(token);

        res.locals = {
            payload: tokenPayload,
        };        
        next();
    } catch (error: unknown) {        
        res.clearCookie("Authorization");
        return res.status(302).redirect("/login");
    }
}

