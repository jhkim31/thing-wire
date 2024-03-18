import OrgDal from "@dals/organization";
import { OrgParser } from "@db/parser";
import IOrganization from "shared/interface/organization/IOrganization";

export default async function postOrg(orgId: string, orgName: string, userId: string): Promise<IOrganization> {
    const organization = await OrgDal.postOrg(orgId, orgName, userId);    
    const orgInfo: IOrganization = OrgParser(organization);
    return orgInfo;
}