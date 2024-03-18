import { NextFunction, Request, Response } from 'express';
import { InvalidError } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';

import { verifyToken } from '@middlewares/jwt';
import UserService from '@services/user';
import logger from '@logger';
import IUser from 'shared/interface/user/IUser';

/**
 * 현재 로그인한 유저의 정보를 가져온다.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export default async function getUser(req: Request, res: Response, next: NextFunction) {
    const authorization = req.cookies.Authorization;
    try {                        
        if (authorization == undefined) {
            throw new InvalidError("인증 헤더가 비었습니다.");
        }

        const [authType, token] = authorization.split(" ");
        if (authType != "bearer" || !token) {
            throw new InvalidError(`인증 헤더 타입이 잘못되었습니다. "${authType}" is not bearer`);
        }

        const tokenPayload = verifyToken(token);        

        const user: IUser = await UserService.getUser(tokenPayload.id);        
        return res.status(200).json(createResponseMessage("success", "get auth success", user));
    } catch (error: unknown) {                
        next(error);
    }
}