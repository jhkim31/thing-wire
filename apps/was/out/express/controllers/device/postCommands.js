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
const Error_1 = require("shared/Error");
const createResponseMessage_1 = __importDefault(require("shared/lib/createResponseMessage"));
const device_manager_1 = __importDefault(require("@api/device-manager"));
const _logger_1 = __importDefault(require("@logger"));
const statusHandler_1 = __importDefault(require("shared/lib/axios/statusHandler"));
function postCommands(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deviceId = req.params.device_id;
            const commandType = req.body.type;
            const deviceCommand = req.body.command;
            if (commandType !== "command" || typeof deviceCommand !== "string") {
                throw new Error_1.BadRequestError(`commandType or deviceCommand is wrong ${commandType}, ${deviceCommand}`);
            }
            const a = yield device_manager_1.default.get('/test')
                .then(d => {
                const b = d.data;
                console.log(d.data);
            });
            const postCommandsResult = yield device_manager_1.default
                .post(`/devices/${deviceId}/commands`, req.body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((d) => {
                const postCommandsResult = (0, statusHandler_1.default)(d);
                return postCommandsResult;
            });
            const resultId = postCommandsResult.resultId;
            let retryCount = 10;
            const intervalId = setInterval(() => {
                device_manager_1.default.get(`/devices/${deviceId}/commands/${resultId}`)
                    .then(d => {
                    const commandResult = (0, statusHandler_1.default)(d);
                    _logger_1.default.warn(commandResult);
                    clearInterval(intervalId);
                    return res.status(200).send((0, createResponseMessage_1.default)('success', 'success', commandResult));
                })
                    .catch(e => {
                    _logger_1.default.error(e.message);
                    retryCount--;
                    if (retryCount <= 0) {
                        clearInterval(intervalId);
                        next(new Error("test!!!!!"));
                    }
                });
            }, 3000);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = postCommands;
//# sourceMappingURL=postCommands.js.map