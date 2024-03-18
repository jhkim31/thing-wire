"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addDevicesToGroup_1 = __importDefault(require("./addDevicesToGroup"));
const addDevicesToOrganization_1 = __importDefault(require("./addDevicesToOrganization"));
const getAllDevices_1 = __importDefault(require("./getAllDevices"));
const getDevice_1 = __importDefault(require("./getDevice"));
const getGroupDevicesData_1 = __importDefault(require("./getGroupDevicesData"));
const getGroupDevicesDetail_1 = __importDefault(require("./getGroupDevicesDetail"));
const getGroupDevicesSimple_1 = __importDefault(require("./getGroupDevicesSimple"));
const getOrganizationDevicesDetail_1 = __importDefault(require("./getOrganizationDevicesDetail"));
const getOrganizationDevicesSimple_1 = __importDefault(require("./getOrganizationDevicesSimple"));
const postComment_1 = __importDefault(require("./postComment"));
const postDevice_1 = __importDefault(require("./postDevice"));
/**
 * Device Service
 * ## method
 */
class DeviceService {
    static getAllDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getAllDevices_1.default)();
        });
    }
    static postDevice(deviceId, deviceType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postDevice_1.default)(deviceId, deviceType);
        });
    }
    static postComment(deviceId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postComment_1.default)(deviceId, comment);
        });
    }
    static getOrganizationDevicesSimple(orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getOrganizationDevicesSimple_1.default)(orgId);
        });
    }
    static getOrganizationDevicesDetail(orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getOrganizationDevicesDetail_1.default)(orgId);
        });
    }
    static getGroupDevicesSimple(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getGroupDevicesSimple_1.default)(groupId);
        });
    }
    static getGroupDevicesDetail(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getGroupDevicesDetail_1.default)(groupId);
        });
    }
    static getGroupDevicesData(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getGroupDevicesData_1.default)(groupId);
        });
    }
    static addDevicesToOrganization(orgId, deviceIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, addDevicesToOrganization_1.default)(orgId, deviceIds);
        });
    }
    static addDevicesToGroup(groupId, deviceIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, addDevicesToGroup_1.default)(groupId, deviceIds);
        });
    }
    static getDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getDevice_1.default)(deviceId);
        });
    }
}
exports.default = DeviceService;
//# sourceMappingURL=index.js.map