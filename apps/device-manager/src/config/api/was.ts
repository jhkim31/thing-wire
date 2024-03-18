import axios from "axios";
import https from "https";
import assert from "assert";

const WAS_HOST = process.env.WAS_HOST as string;
const WAS_PORT = process.env.WAS_PORT as string;
const WAS_VERSION = process.env.WAS_VERSION as string;

assert.strictEqual(typeof WAS_HOST, "string", "WAS_HOST (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof WAS_PORT, "string", "WAS_PORT (이)가 선언되지 않았습니다.");
assert.strictEqual(typeof WAS_VERSION, "string", "WAS_VERSION (이)가 선언되지 않았습니다.");

const agent = new https.Agent({ rejectUnauthorized: false });
const wasApi = axios.create({
    baseURL: `https://${WAS_HOST}:${WAS_PORT}/api/${WAS_VERSION}`,
    httpsAgent: agent,
    timeout: 3000
})

export default wasApi;