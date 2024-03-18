import { NextFunction, Request, Response } from 'express';

import getUser from './getUser';
import postAuth from './postAuth';
import verifyAuth from './verifyAuth';
import verifyAuthPage from './verifyAuthPage';

/**
 * # Auth Controller
 * 인증과 관련된 Controller
 * ## Method
 * * postAuth : 인증 정보를 통해 인증을 시도 (성공시 jwt 토큰 제공) 
 * * getUser : 사용자의 인증 정보를 제공
 * * verifyAuth : API 사용시, 사용자의 jwt 토큰 검증
 * * verifyAuthPage : 페이지 요청시, 사용자의 jwt 토큰 검증
 * * logout : 로그아웃
 */
export default class AuthController {
    static async postAuth(req: Request, res: Response, next: NextFunction) {    
        await postAuth(req, res, next);
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {           
        await getUser(req, res, next);
    }

    static verifyAuth(req: Request, res: Response, next: NextFunction) {                    
        verifyAuth(req, res, next);
    }

    static verifyAuthPage(req: Request, res: Response, next: NextFunction) {            
        verifyAuthPage(req, res, next);
    }
    
    static logout(req: Request, res: Response) {
        res.clearCookie("Authorization");
        return res.status(302).redirect("/login");
    }
}