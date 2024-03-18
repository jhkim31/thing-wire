import { AxiosResponse } from "axios";
import IResponseMessage from "shared/interface/IResponseMessage";
import { AnyValidateFunction } from "ajv/dist/types";

/**
 * Axios 요청으로 받아온 결과를 확인하는 핸들러.  
 * * JSON header의 status를 확인한다.
 * @param d AxiosResponse
 * @param schemaId Schema의 id;
 * @return ResponseBody
 * @throws {Error}
 */

export default function statusHandler<T>(d: AxiosResponse<IResponseMessage<T>, any>, validate?: AnyValidateFunction<T>): T {
    if (typeof d.data?.header?.status !== "string" && typeof d.data?.header?.message !== "string") {
        throw new Error(`response schema가 잘못되었습니다.`);
    }

    if (d.data.header.status !== "success") {
        throw new Error(`e : ${d.data.header.message}`);
    }

    if (validate) {
        const isValid = validate(d.data.body);

        if (!isValid) {
            throw new Error(`Schema not match`);
        }
    }


    return d.data.body;
}