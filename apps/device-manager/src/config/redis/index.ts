import { createClient } from 'redis';
import assert from "assert";
import logger from '@logger';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

assert.strictEqual(typeof REDIS_HOST, "string", "REDIS_HOST (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof REDIS_PORT, "string", "REDIS_PORT (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof REDIS_PASSWORD, "string", "REDIS_PASSWORD (이)가 선언되지 않았습니다.");

const redisClient = createClient({ url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`, });

redisClient.on('ready', () => {
    logger.info('Redis is ready');
});

redisClient.on('reconnecting', () => {
    logger.info('client is reconnecting');
});

redisClient.on('end', () => {
    logger.info('Redis connection ended');
});

redisClient.on('connect', () => {
    logger.info('connected');
});

redisClient.on('error', (err) => {
    logger.error('Redis error: ', err);
});

redisClient.connect()
    .then(d => {
        logger.info(`redis init connect`);
    })
    .catch(e => {
        assert.fail(`redis init error ${e.message}`);
    })

export default redisClient;
