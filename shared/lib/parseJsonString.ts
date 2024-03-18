import { AnyValidateFunction } from "ajv/dist/core";

export default function parseJsonString<T>(jsonString: string, validate: AnyValidateFunction<T>): T {
    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString);
    } catch (e) {
        if (e instanceof Error) {
            e.message += `\n${jsonString}`;
            throw e;
        } else {
            throw new Error(`json parse error\n${jsonString}`);
        }
    }

    const isValid = validate(jsonObj);

    if (isValid) {
        return jsonObj as T;
    } else {
        throw new Error(`object is invalid in json schema\n${JSON.stringify({
            message: jsonObj,
            schema: validate.schema
        }, null, 4)}`);
    }
}