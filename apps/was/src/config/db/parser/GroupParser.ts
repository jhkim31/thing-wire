import { Group } from "@db/models";
import IGroup from "shared/interface/group/IGroup";
import ConfigFileParser from "./ConfigFileParser";

/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 * 
 * {@link Group} => {@link IGroup}
 */
export default function GroupParser(group: Group): IGroup {
    if (group.isConfigGroup && group.configFile) {
        const groupInfo: IGroup = {
            id: group.id,
            name: group.name,
            isConfigGroup: group.isConfigGroup,
            configFile: ConfigFileParser(group.configFile)
        }

        return groupInfo;
    } else {
        const groupInfo: IGroup = {
            id: group.id,
            name: group.name,
            isConfigGroup: group.isConfigGroup,        
        }

        return groupInfo;
    }


}