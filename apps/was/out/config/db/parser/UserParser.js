"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 *
 * {@link User} => {@link IUser}
 */
function UserParser(user) {
    const userInfo = {
        id: user.id,
        name: user.name,
        isSA: user.isSA
    };
    return userInfo;
}
exports.default = UserParser;
//# sourceMappingURL=UserParser.js.map