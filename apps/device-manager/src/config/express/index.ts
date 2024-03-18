import bodyParser from 'body-parser';
import express from 'express';
import { readFileSync } from 'fs';
import staticPath from 'shared/lib/staticPath';

const app = express();
const httpsOptions = {
    cert: readFileSync(staticPath("./device-manager.cert")),
    key: readFileSync(staticPath("./device-manager.key")),
}
app.use(bodyParser.json());

export default app;
export {httpsOptions};