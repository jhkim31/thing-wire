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
const device_manager_1 = __importDefault(require("@api/device-manager"));
function uploadFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const deviceId = req.params.device_id;
        // 파일 전송을 위해 다른 서버 URL
        const deviceManagerUrl = `v1/devices/${deviceId}/upload`;
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: "파일이 전송되지 않았습니다." });
            }
            // 파일을 Blob으로 변환
            const blobFile = new Blob([file.buffer], { type: file.mimetype });
            // 파일을 다른 서버로 전송
            const formData = new FormData();
            formData.append("file", blobFile, Buffer.from(file.originalname, "latin1").toString("utf8"));
            const response = yield device_manager_1.default.put(deviceManagerUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.json({ message: "파일 전송이 완료되었습니다." });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = uploadFile;
//# sourceMappingURL=uploadFile.js.map