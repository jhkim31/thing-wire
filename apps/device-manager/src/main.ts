import assert from 'assert';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config();
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: "../../.env" });
} else {
    dotenv.config();
}
import { NextFunction, Request, Response } from 'express';
import { createServer } from 'https';

import app, { httpsOptions } from '@express';
import DeviceRouter from '@routers/device.router';
import logger from '@logger';

const DEVICE_MANAGER_PORT = process.env.DEVICE_MANAGER_PORT as string;
const DEVICE_MANAGER_PORT_NUMBER = parseInt(DEVICE_MANAGER_PORT);
const DEVICE_MANAGER_VERSION = process.env.DEVICE_MANAGER_VERSION as string;

assert.strictEqual(typeof DEVICE_MANAGER_PORT, "string", "DEVICE_MANAGER_PORT (이)가 선언되지 않았습니다.");
assert.strictEqual(isNaN(DEVICE_MANAGER_PORT_NUMBER), false, "DEVICE_MANAGER_PORT (이)가 정상적으로 선언되지 않았습니다.");
assert.strictEqual(typeof DEVICE_MANAGER_VERSION, "string", "DEVICE_MANAGER_VERSION (이)가 선언되지 않았습니다.");
app.use((req, res, next) => {
    logger.debug(`${req.ip} ${req.method} ${req.originalUrl} \nparams : ${JSON.stringify(req.params, null, 4)}\nquery : ${JSON.stringify(req.query, null, 4)}\nbody : ${JSON.stringify(req.body, null, 4)}`);
    next();
});

app.get('/v1/test', (req, res) => {
    res.send("test");
});

app.use(`/${DEVICE_MANAGER_VERSION}/devices`, DeviceRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        logger.error(err.stack);
    } else {
        logger.error(err);
    }
    res.status(500).send("error!");
});

const httpsServer = createServer(httpsOptions, app);
httpsServer.listen(DEVICE_MANAGER_PORT_NUMBER, () => {
    logger.info(`device-manager listen in ${DEVICE_MANAGER_PORT_NUMBER}`);
});