import { DeviceParser } from '@db/parser';
import IDevice from 'shared/interface/device/IDevice';
import DeviceDal from 'src/express/dals/device';

export default async function getOrganizationDevicesSimple(orgId: string): Promise<IDevice[]> {
    const devices = await DeviceDal.getOrganizationDevices(orgId);
    const deviceInfos: IDevice[] = devices.map((device) => DeviceParser(device));

    return deviceInfos;
}