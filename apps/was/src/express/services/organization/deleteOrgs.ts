import OrgDal from "@dals/organization";

export default async function deleteOrgs(userId: string, orgIds: string[]): Promise<boolean> {
    const result = await OrgDal.deleteOrgs(userId, orgIds);        
    return result;
}