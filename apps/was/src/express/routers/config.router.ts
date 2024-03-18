import AuthController from '@controllers/auth';
import assert from 'assert';
import { Router } from 'express';
import { readFileSync } from 'fs';
import createResponseMessage from 'shared/lib/createResponseMessage';
import staticPath from 'shared/lib/staticPath';

const WAS_VERSION = process.env.WAS_VERSION as string;
assert.strictEqual(typeof WAS_VERSION, "string", "WAS_VERSION (이)가 선언되지 않았습니다.");

const ConfigRouter = Router({mergeParams: true});

ConfigRouter.get(`/`, AuthController.verifyAuth, (req, res) => {
    const configFilePath = staticPath("./src/config/module_info.json");    
    const configJsonBuf = readFileSync(configFilePath);
    const configJsonStr = configJsonBuf.toString("utf-8");
    const configJson = JSON.parse(configJsonStr);

    return res.status(200).json(createResponseMessage("success", "success", configJson));
});

export default ConfigRouter;