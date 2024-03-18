import { Router } from 'express';
import FileController from '@controllers/file';
import uploadFileMemory from '@multer';

const FileRouter = Router({mergeParams: true});

FileRouter.put("/", uploadFileMemory.single("file"), FileController.uploadFile);
FileRouter.get("/", FileController.getFiles);

export default FileRouter;
