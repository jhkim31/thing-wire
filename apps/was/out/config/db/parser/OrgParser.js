"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 *
 * {@link Organization} => {@link IOrganization}
 */
function OrgParser(org) {
    const orgInfo = {
        id: org.id,
        name: org.name,
        owner: org.owner
    };
    return orgInfo;
}
exports.default = OrgParser;
//# sourceMappingURL=OrgParser.js.map