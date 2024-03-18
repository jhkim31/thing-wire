import IOrganization from "../organization/IOrganization";
import IGroup from "../group/IGroup";
import IDevice from "../device/IDevice";
import IUser from "../user/IUser";
import IConfigFile from "../configfile/IConfigFile";

/**
 * react app global redux state
 * ```typescript
 * interface State {
 *  org: IOrganization;
 *  group: IGroup;
 *  user: IUser;
 *  components: {
 *      [page: string]: ComponentInfo;
 *  },
 *  componentInteraction: {
 *      selectedOrg: string;
 *      selectedGroup: string;
 *      selectedDevice: string;
 *  }
 * }
 * ```
 * 
 * @see {@link IOrganization}
 * @see {@link IGroup}
 * @see {@link IDevice}
 * @see {@link IUser}
 * @see {@link ComponentInfo}
 * 
 * 
 */
export default interface State {
    /**
     * react 앱에서 현재 선택된 Organization
     * @see {@link IOrganization}
     */
    org: IOrganization;
    /**
     * react 앱에서 현재 선택된 Group
     * @see {@link IGroup}
     */
    group: IGroup;
    /**
     * react 앱에서 현재 선택된 Device
     * @see {@link IDevice}
     */
    device: IDevice;
    /**
     * 현재 접속중인 유저의 정보.
     * @see {@link IUser}
     */
    user: IUser;
    components: {
        [page: string]: ComponentInfo;
    };
    /**
     * @see {@link ComponentInfo}
     */
    interaction: {
        org: {
            main: {
                selectedOrgId: string;
                selectedGroupId: string;
                selectedDeviceId: string;
                selectedViewName: string;
                a: number;
            }
        },
        group: {
            configfile: {
                fileId: string;
                file: IConfigFile;
            }
        }
    },
    /**
     * API Version
     * v1
     */
    version: string;
}

/**
 * 각 페이지에서 사용하는 component 모듈들에 대한 정보  
 * 모듈의 이름과, grid row, grid col 정보가 있음.  
 * 
 * ```typescript
 * interface ComponentInfo {
 *  col: number;        // 페이지의 grid col
 *  row: number;        // 페이지의 grid row
 *  components: {
 *      componentName: string;  // 모듈 이름
 *      colSpan?: number;       // 모듈의 colSpan
 *      rowSpan?: number;       // 모듈의 rowSpan
 *  }[]
 * }
 * ```
 * 
 */
export interface ComponentInfo {
    col: number;
    row: number;
    components: {
        componentName: string;
        colSpan?: number;
        rowSpan?: number;
    }[];
}