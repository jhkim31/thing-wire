"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 *
 * {@link Device} => {@link IDevice}
 */
function DeviceParser(device) {
    const deviceInfo = {
        id: device.id,
        name: device.name,
        type: device.type,
        comment: device.comment
    };
    return deviceInfo;
}
exports.default = DeviceParser;
//# sourceMappingURL=DeviceParser.js.map