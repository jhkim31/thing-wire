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
const axios_1 = __importDefault(require("axios"));
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
function getTsdbData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const deviceId = req.params.device_id;     
            const deviceId = `12:34:56:AA:01:85`;
            const startAt = req.query.startAt;
            let downsample = "";
            switch (startAt) {
                case "5m-ago":
                    downsample = "";
                    break;
                case "1h-ago":
                    downsample = "1m-avg-none:";
                    break;
                case "12h-ago":
                    downsample = "30m-avg-none:";
                    break;
                case "1d-ago":
                    downsample = "1h-avg-none:";
                    break;
            }
            const url = `http://io.energyiotlab.com:54242/api/query?m=sum:${downsample}keti-f4{mac=floe${deviceId.split(':')[4]}${deviceId.split(':')[5]},sensor=*}&start=${startAt}`;
            const tsdbData = yield axios_1.default.get(url).then(d => d.data);
            console.log(tsdbData);
            res.status(200).send((0, createResponseMessage_1.default)("success", "success", tsdbData));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getTsdbData;
//# sourceMappingURL=getTsdbData.js.map