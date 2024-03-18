import DeviceDal from "@dals/device";
import IDevice from "shared/interface/device/IDevice";

export default async function postComment(deviceId: string, comment: string): Promise<boolean> {
    const result = await DeviceDal.postComment(deviceId, comment);
    return result;
}