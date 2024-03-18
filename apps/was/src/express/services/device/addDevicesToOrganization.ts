import DeviceDal from "@dals/device";

export default async function addDevicesToOrganization(orgId: string, deviceIds: string[]): Promise<boolean> {
    const result = await DeviceDal.addDevicesToOrganization(orgId, deviceIds);    
    return result;
}