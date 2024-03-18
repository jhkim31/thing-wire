import DeviceDal from "@dals/device";
import { DeviceParser } from "@db/parser";
import IDevice from "shared/interface/device/IDevice";

export default async function postDevice(deviceId: string, deviceType: number): Promise<IDevice> {
    const device = await DeviceDal.postDevice(deviceId, deviceType);
    const deviceInfo: IDevice = DeviceParser(device);
    return deviceInfo;
}