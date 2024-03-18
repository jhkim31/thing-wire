"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("shared/Error");
const jwt_1 = require("@middlewares/jwt");
/**
 * api 요청이 들어오면, jwt 토큰이 검증된 토큰인지 확인.
 * 토큰이 올바르다면 res.local 객체에 token payload를 저장하고, next함수 호출
 *
 * @throws {InvalidError}
 */
function verifyAuthPage(req, res, next) {
    const authorization = req.cookies.Authorization;
    try {
        if (authorization == undefined) {
            throw new Error_1.InvalidError("인증 쿠키가 비었습니다.");
        }
        const [authType, token] = authorization.split(" ");
        if (authType != "bearer" || !token) {
            throw new Error_1.InvalidError(`인증 쿠키 타입이 잘못되었습니다. "${authType}" is not bearer`);
        }
        const tokenPayload = (0, jwt_1.verifyToken)(token);
        res.locals = {
            payload: tokenPayload,
        };
        next();
    }
    catch (error) {
        res.clearCookie("Authorization");
        return res.status(302).redirect("/login");
    }
}
exports.default = verifyAuthPage;
//# sourceMappingURL=verifyAuthPage.js.map