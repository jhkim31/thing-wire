import path from "path";

/**
 * cwd (node 프로세스를 실행한 디렉토리) 를 기준으로 상대경로를 절대경로로 바꿔서 리턴한다. 
 * * 코드들은 각 앱의 루트 디렉토리에서 실행되도록 코드가 짜져여 있음. 참고 
 * 
 * @param relative_path cwd 기준 상대경로
 * @returns 해당 경로의 계산된 절대경로
 */
export default function staticPath (relative_path: string) {
    return path.resolve(process.cwd(), relative_path);
};
