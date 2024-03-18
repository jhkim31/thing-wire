import OrgDal from "@dals/organization";

export default async function deleteOrg(userId: string, orgId: string): Promise<boolean> {
    const result = await OrgDal.deleteOrg(userId, orgId);        
    return result;
}