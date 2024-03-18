/**
 * REST API에 대한 응답 결과.  
 * haeder 는 code, message를 포함하며, 나머지 내용은 body에 포함된다.  
 * body의 타입은 제너릭으로 타입을 받는다.
 * ```typescript
 * interface IResponseMessage<T> {
 *  header: {
 *      code: string;
 *      message: string;
 *  },
 *  body: T;
 * }
 * ```
 */
export default interface IResponseMessage<T> {
    header : {
        status: "success" | "error" | "OK";
        message: string;
    };
    body: T;
}