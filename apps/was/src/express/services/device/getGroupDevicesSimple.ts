import { DeviceParser } from '@db/parser';
import IDevice from 'shared/interface/device/IDevice';
import DeviceDal from 'src/express/dals/device';

export default async function getGroupDevicesSimple(groupId: string): Promise<IDevice[]> { 
    const devices = await DeviceDal.getGroupDevices(groupId);
    const deviceInfos: IDevice[] = devices.map(device => DeviceParser(device));
    
    return deviceInfos;
}