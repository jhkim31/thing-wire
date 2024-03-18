/**
 * 그룹에 대한 인터페이스
 * ```typescript
 * interface IGroup {
 *  id: string;
 *  name: string;
 * }
 * ```
 */

import IConfigFile from "../configfile/IConfigFile";

export default interface IGroup {
    id: string;
    name: string;
    isConfigGroup: boolean;
    configFile?: IConfigFile;
}