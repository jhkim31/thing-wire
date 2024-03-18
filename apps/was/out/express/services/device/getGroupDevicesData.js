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
const device_1 = __importDefault(require("src/express/dals/device"));
const dateToLocaleString_1 = __importDefault(require("shared/lib/dateToLocaleString"));
const axios_1 = __importDefault(require("axios"));
function getGroupDevicesData(groupId) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const AllDeviceDatasUrl = (_a = process.env.KETI_V1_SENSORS_URL) !== null && _a !== void 0 ? _a : "http://keti1.energyiotlab.com:30101/v1/sensors";
        const devices = yield device_1.default.getGroupDevices(groupId);
        const deviceIds = new Set(devices.map((device) => device.id.toUpperCase()));
        const deviceIdsCheck = new Set();
        deviceIds.forEach(i => deviceIdsCheck.add(i));
        const tableHeader = new Set(["name", "id", "last updated time"]);
        const tableBody = [];
        const AllDeviceDatas = yield axios_1.default
            .get(AllDeviceDatasUrl, { timeout: 3000 })
            .then((d) => {
            if (d.status == 200) {
                return d.data;
            }
        });
        /**
         * TODO
         * schema 검증
         */
        for (const [groupName, group] of Object.entries(AllDeviceDatas)) {
            if (typeof group != "object") {
                continue;
            }
            for (const [deviceName, device] of Object.entries(group)) {
                try {
                    const deviceId = ((_f = (_e = (_d = (_c = (_b = device === null || device === void 0 ? void 0 : device["data"]) === null || _b === void 0 ? void 0 : _b["node_info"]) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d["info"]) === null || _e === void 0 ? void 0 : _e["mac"]) !== null && _f !== void 0 ? _f : "").toUpperCase();
                    if (typeof device != "object" || deviceId == "") {
                        continue;
                    }
                    if (deviceIds.has(deviceId)) {
                        const tableRow = {};
                        tableRow["name"] = deviceName;
                        tableRow['id'] = deviceId;
                        tableRow["last updated time"] = (0, dateToLocaleString_1.default)(new Date(parseInt(device === null || device === void 0 ? void 0 : device["service"]["timestamp"]) * 1000));
                        for (const [sensor, data] of Object.entries(device["data"]["sensors"])) {
                            tableHeader.add(sensor);
                            if (typeof data == "number" || typeof data == "string") {
                                const t = typeof data == "number" ? data.toFixed(4) : parseFloat(data).toFixed(4);
                                tableRow[sensor] = t;
                            }
                            else if (typeof data == "object" && data !== null && "value" in data) {
                                const t = typeof data.value == "number" ? data.value.toFixed(4) : typeof data.value == "string" ? parseFloat(data.value).toFixed(4) : "-";
                                tableRow[sensor] = t;
                            }
                        }
                        tableBody.push(tableRow);
                        deviceIdsCheck.delete(deviceId);
                    }
                }
                catch (e) {
                }
            }
        }
        deviceIdsCheck.forEach(i => {
            tableBody.push({ name: i, id: i });
        });
        return { tableHeader: Array.from(tableHeader), tableBody: tableBody };
    });
}
exports.default = getGroupDevicesData;
//# sourceMappingURL=getGroupDevicesData.js.map