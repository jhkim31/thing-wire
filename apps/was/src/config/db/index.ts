import { Sequelize } from 'sequelize-typescript';
import assert from 'assert';
import logger from '@logger';

import * as models from './models';

const MARIADB_HOST = process.env.MARIADB_HOST;
const MARIADB_PORT = process.env.MARIADB_PORT as string;
const MARIADB_DB = process.env.MARIADB_DB;
const MARIADB_USERNAME = process.env.MARIADB_USERNAME;
const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;

assert.strictEqual(typeof MARIADB_HOST, "string", "MARIADB_HOST (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof MARIADB_PORT, "string", "MARIADB_PORT (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof MARIADB_DB, "string", "MARIADB_DB (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof MARIADB_USERNAME, "string", "MARIADB_USERNAME (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof MARIADB_PASSWORD, "string", "MARIADB_PASSWORD (이)가 선언되지 않았습니다.");

const MARIADB_PORT_INT = parseInt(MARIADB_PORT);
assert.strictEqual(isNaN(MARIADB_PORT_INT), false, "MARIADB_PORT (이)가 정상적으로 선언되지 않았습니다.");

const sequelize = new Sequelize({
    host: MARIADB_HOST,
    port: MARIADB_PORT_INT,
    database: MARIADB_DB,
    username: MARIADB_USERNAME,
    password: MARIADB_PASSWORD,

    dialect: "mariadb",
    timezone: "+09:00",
    logging: false,    
});

async function sequelize_init() {
    try {
        await sequelize.authenticate();
        sequelize.addModels(Object.values(models));

        await sequelize.sync({ alter: true });

        logger.info("sequelize init");
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`sequelize init error ${err.message}`);                        
        } else {
            logger.error(`sequelize init error ${"알 수 없는 에러"}\n`);            
        }

    }
}
sequelize_init();

export default sequelize;
