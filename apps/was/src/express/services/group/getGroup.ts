import GroupDal from "@dals/group";
import { GroupParser } from "@db/parser";
import IGroup from "shared/interface/group/IGroup";

export default async function getGroup(groupId: string): Promise<IGroup> {
    const group = await GroupDal.getGroup(groupId);        
    const groupInfo: IGroup = GroupParser(group);
    return groupInfo;
}