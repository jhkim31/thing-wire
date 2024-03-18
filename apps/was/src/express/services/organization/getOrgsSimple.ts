import { OrgParser } from '@db/parser';
import IOrganization from 'shared/interface/organization/IOrganization';
import OrgDal from 'src/express/dals/organization';

export default async function getOrgsSimple(userId: string): Promise<IOrganization[]> {
    const organizations = await OrgDal.getUserJoinedOrgs(userId);
    const orgInfos: IOrganization[] = organizations.map(organization => OrgParser(organization));
    
    return orgInfos;
}
