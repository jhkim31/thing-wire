import { GroupParser } from '@db/parser';
import IGroup from 'shared/interface/group/IGroup';
import GroupDal from 'src/express/dals/group';

export default async function getOrganizationGroupsSimple(orgId: string): Promise<IGroup[]> {
    const orgGroups = await GroupDal.getOrganizationGroups(orgId);
    const groupInfos: IGroup[] = orgGroups.map(group => GroupParser(group));
    
    return groupInfos;
}