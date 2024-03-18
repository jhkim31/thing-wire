"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("src/express/controllers/auth"));
/**
 * ## Auth Router
 * ### `/api/v1/auth`
 * * GET `/` getUser
 * * POST `/` postAuth
 * * GET `/logout` logout
*/
const AuthRouter = (0, express_1.Router)();
AuthRouter.get("/", auth_1.default.getUser);
AuthRouter.post("/", auth_1.default.postAuth);
AuthRouter.get('/logout', auth_1.default.logout);
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map