import DeviceDal from "@dals/device";
import { DeviceParser } from "@db/parser";
import IDevice from "shared/interface/device/IDevice";

export default async function getDevice(deviceId: string): Promise<IDevice> {
    const device = await DeviceDal.getDevice(deviceId);    
    const deviceInfo: IDevice = DeviceParser(device);
    return deviceInfo;
}