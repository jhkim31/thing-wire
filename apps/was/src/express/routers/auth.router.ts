import { Router } from 'express';
import AuthController from 'src/express/controllers/auth';

/**
 * ## Auth Router
 * ### `/api/v1/auth`
 * * GET `/` getUser
 * * POST `/` postAuth
 * * GET `/logout` logout
*/
const AuthRouter = Router();

AuthRouter.get("/", AuthController.getUser);
AuthRouter.post("/", AuthController.postAuth);
AuthRouter.get('/logout', AuthController.logout);

export default AuthRouter;
