import { AxiosResponse } from 'axios';
import IResponseMessage from 'shared/interface/IResponseMessage';

/**
 * Axios 요청으로 받아온 결과를 확인하는 핸들러.  
 * * JSON header의 status를 확인한다.
 * @param d AxiosResponse
 * @throws {Error}
 */
export default function statusHandler<T>(d: AxiosResponse<IResponseMessage<T>, any>): T {
    if (typeof d.data?.header?.status !== "string" && typeof d.data?.header?.message !== "string"){
        throw new Error(`response에 문제가 발생했습니다.`);
    }
    
    if (d.data.header.status !== "success") {
        throw new Error(`e : ${d.data.header.message}`);
    }

    return d.data.body;
}