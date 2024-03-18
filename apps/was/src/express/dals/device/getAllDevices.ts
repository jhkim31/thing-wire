import { Device, Organization } from '@db/models';

export default async function getAllDevices(): Promise<Device[]> {
    const devices = await Device.findAll({
        include: [
            {
                model: Organization,
            },
        ],
    });
    return devices;
}
