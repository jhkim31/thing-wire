import { Device } from '@db/models';
import logger from '@logger';

export default async function postDevice(deviceId: string, deviceType: number): Promise<Device> {
    const existDevice = await Device.findByPk(deviceId);    
    if (existDevice) {
        return existDevice;
    } else {
        const device = await Device.create({ id: deviceId, name: deviceId, type: deviceType });
        logger.trace(`device가 등록되었습니다. ${JSON.stringify(device, null, 4)}`);
        return device;
    }
}
