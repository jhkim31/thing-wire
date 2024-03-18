import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ErrorName } from 'shared/Error';
import createResponseMessage from 'shared/lib/createResponseMessage';
import archiver from 'archiver';

const fileQueue: any = {};
/**
 * Device Controller
 * 
 * ## Method
 * 
 */
export default class FileController {
    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = req.file;
            const deviceId = req.params.device_id;
            if (!file) {
                throw new BadRequestError(`file is empty`);
            }
            if (fileQueue[deviceId] == undefined) {
                fileQueue[deviceId] = [file];
            } else {
                fileQueue[deviceId].push(file);
            }

            res.status(200).json(createResponseMessage("success", "success", {}));
        } catch (err: unknown) {
            next(err);
        }
    }

    static async getFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const deviceId = req.params.device_id;
            const archive = archiver("zip");

            if (!fileQueue[deviceId]) {
                throw new BadRequestError(`No file received`);
            }
            fileQueue[deviceId].forEach((file: any) => {
                archive.append(file.buffer, { name: Buffer.from(file.originalname, "latin1").toString("utf8") });
            });
            delete fileQueue[deviceId];

            archive.finalize();
            archive.pipe(res);
        } catch (err: unknown) {
            next(err);
        }
    }
}