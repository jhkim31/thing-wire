import GroupDal from "@dals/group";
import { GroupParser } from "@db/parser";
import IGroup from "shared/interface/group/IGroup";

export default async function postGroup(groupId: string, groupName: string, orgId: string): Promise<IGroup> {
    const group = await GroupDal.postGroup(groupId, groupName, orgId);    
    const groupInfo: IGroup = GroupParser(group);
    return groupInfo;
}