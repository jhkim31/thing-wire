import GroupDal from "@dals/group";

export default async function deleteGroup(orgId: string, groupId: string): Promise<boolean> {
    const result = await GroupDal.deleteGroup(orgId, groupId);        
    return result;
}