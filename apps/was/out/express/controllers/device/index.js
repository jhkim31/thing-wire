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
const getGroupDevices_1 = __importDefault(require("./getGroupDevices"));
const getGroupDevicesData_1 = __importDefault(require("./getGroupDevicesData"));
const getSystemData_1 = __importDefault(require("./getSystemData"));
const getTsdbData_1 = __importDefault(require("./getTsdbData"));
const postComment_1 = __importDefault(require("./postComment"));
const postDevice_1 = __importDefault(require("./postDevice"));
const postCommands_1 = __importDefault(require("./postCommands"));
const uploadFile_1 = __importDefault(require("./uploadFile"));
const getOrganizationDevices_1 = __importDefault(require("./getOrganizationDevices"));
const getDevice_1 = __importDefault(require("./getDevice"));
/**
 * Device Controller
 *
 * ## Method
 *
 */
class DeviceController {
    static getAllDevices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getAllDevices_1.default)(req, res, next);
        });
    }
    static addDevicesToOrganization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, addDevicesToOrganization_1.default)(req, res, next);
        });
    }
    static getOrganizationDevices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getOrganizationDevices_1.default)(req, res, next);
        });
    }
    static addDevicesToGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, addDevicesToGroup_1.default)(req, res, next);
        });
    }
    static getGroupDevices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getGroupDevices_1.default)(req, res, next);
        });
    }
    static getGroupDevicesData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getGroupDevicesData_1.default)(req, res, next);
        });
    }
    static postDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postDevice_1.default)(req, res, next);
        });
    }
    static postComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postComment_1.default)(req, res, next);
        });
    }
    static postCommands(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, postCommands_1.default)(req, res, next);
        });
    }
    static uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, uploadFile_1.default)(req, res, next);
        });
    }
    static getSystemData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getSystemData_1.default)(req, res, next);
        });
    }
    static getTsdbData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getTsdbData_1.default)(req, res, next);
        });
    }
    static getDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getDevice_1.default)(req, res, next);
        });
    }
}
exports.default = DeviceController;
//# sourceMappingURL=index.js.map