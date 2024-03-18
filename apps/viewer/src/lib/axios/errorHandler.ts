/**
 * Axios의 Error 핸들러.  
 * catch의 파라미터와, setErrMsg 함수를 받는다.  
 * setErrMsg 함수는 Dispatch<setState> 로써, 에러 메시지 state를 변경하여, 모듈에 메시지를 띄우기 위해 사용됨.
 * @param e catch 파라미터
 * @param setErrMsg setState 함수
 */
export default function errorHandler(e: unknown, setErrMsg: React.Dispatch<React.SetStateAction<string>>) {
    if (e instanceof Error) {
        setErrMsg(`e : ${e.message}`);
    } else {
        setErrMsg(`알 수 없는 에러 Auth`);
    }
}