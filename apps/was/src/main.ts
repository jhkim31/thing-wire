import assert from 'assert';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {    
    dotenv.config();
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({path : "../../.env"});    
} else {
    dotenv.config();
}

import fs from 'fs';
import https from 'https';
import staticPath from 'shared/lib/staticPath';

import app from '@express';
import ErrorHandler from '@middlewares/Handler/ErrorHandler';
import ApiRouter from '@routers/APIRouter';
import ViewRouter from '@routers/view.router';

const WAS_PORT = process.env.WAS_PORT as string;
assert.strictEqual(typeof WAS_PORT, "string", "WAS_PORT (이)가 선언되지 않았습니다.");
const WAS_PORT_INT = parseInt(WAS_PORT);
assert.strictEqual(isNaN(WAS_PORT_INT), false, `WAS_PORT (이)가 정상적으로 선언되지 않았습니다. : ${WAS_PORT}`);

app.use('/api', ApiRouter);
app.use(`/`, ViewRouter);

app.use((req, res, next) => {
    return res.status(404).send("404 Not Found");
});

app.use(ErrorHandler);


const options = {
    key: fs.readFileSync(staticPath("./thing_wire.key")),
    cert: fs.readFileSync(staticPath("./thing_wire.cert")),
};

const server = https.createServer(options, app);

server.listen(WAS_PORT_INT, () => {

});