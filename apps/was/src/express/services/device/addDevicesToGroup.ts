import DeviceDal from "@dals/device";

export default async function addDevicesToGroup(groupId: string, deviceIds: string[]): Promise<boolean> {
    const result = await DeviceDal.addDevicesToGroup(groupId, deviceIds);    
    return result;
}