import { NextFunction, Request, Response } from 'express';

import api from '@api/device-manager';

export default async function uploadFile(req: Request, res: Response, next: NextFunction) {
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
        const response = await api.put(deviceManagerUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.json({ message: "파일 전송이 완료되었습니다." });
    } catch (error: unknown) {
        next(error);
    }
}