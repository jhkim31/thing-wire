import { BadRequestError } from 'shared/Error';

import { Device } from '@db/models';

export default async function postComment(deviceId: string, comment: string): Promise<boolean> {
    const device = await Device.findByPk(deviceId);
    if (device == null) {
        throw new BadRequestError("Wrong Device Id");
    }

    device.comment = comment;
    await device.save();
    return true;
}