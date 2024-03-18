/**
 * 에러를 만들어 리턴해주는 함수
 * @param name 에러의 이름(타입)
 * @param message 에러메시지
 * @returns 생성된 에러를 리턴합니다.
 */
export default function createError(name: string, message: string){
    const e = new Error();
    e.name = name;
    e.message = message;
    return e;
}