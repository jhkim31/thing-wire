import IGroup from "../group/IGroup";
import IUser from "../user/IUser";

/**
 * 
 ```typescript
interface IConfigFile {
    id: string;  
    name: string;      
    dataId: string;     // 실제 데이터가 저장된 테이블의 ID
}
 ```
 */
export default interface IConfigFile {
    id: string;  
    name: string;      
    comment: string;
    data: string;
    modifier: IUser;
    updatedAt: number;
}