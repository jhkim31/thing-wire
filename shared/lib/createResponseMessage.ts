import IResponseMessage from "../interface/IResponseMessage";

/**
 * Response Message를 만드는 함수
 * @param code 결과코드
 * @param message 결과 메시지
 * @param content 리턴데이터
 */
export default function createResponseMessage<T>(status: "success" | "error" | "OK", message: string, content: T): IResponseMessage<T> {    
    return {
        header: {
            status: status,
            message: message
        },
        body: content
    };
}
