"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFileParser_1 = __importDefault(require("./ConfigFileParser"));
/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 *
 * {@link Group} => {@link IGroup}
 */
function GroupParser(group) {
    if (group.isConfigGroup && group.configFile) {
        const groupInfo = {
            id: group.id,
            name: group.name,
            isConfigGroup: group.isConfigGroup,
            configFile: (0, ConfigFileParser_1.default)(group.configFile)
        };
        return groupInfo;
    }
    else {
        const groupInfo = {
            id: group.id,
            name: group.name,
            isConfigGroup: group.isConfigGroup,
        };
        return groupInfo;
    }
}
exports.default = GroupParser;
//# sourceMappingURL=GroupParser.js.map