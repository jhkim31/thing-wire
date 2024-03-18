"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 *
 * {@link ConfigFile} => {@link IConfigFile}
 */
function ConfigFileParser(configFile) {
    var _a, _b, _c, _d;
    const modifier = {
        id: (_b = (_a = configFile.modifier) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "",
        name: (_d = (_c = configFile.modifier) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : ""
    };
    const configFileInfo = {
        id: configFile.id,
        name: configFile.name,
        comment: configFile.comment,
        data: configFile.data,
        modifier: modifier,
        updatedAt: configFile.updatedAt.getTime()
    };
    return configFileInfo;
}
exports.default = ConfigFileParser;
//# sourceMappingURL=ConfigFileParser.js.map