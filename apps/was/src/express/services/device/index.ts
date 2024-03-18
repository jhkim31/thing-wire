import IDevice from 'shared/interface/device/IDevice';
import IDataTable from 'shared/interface/ui/IDataTable';

import addDevicesToGroup from './addDevicesToGroup';
import addDevicesToOrganization from './addDevicesToOrganization';
import getAllDevices from './getAllDevices';
import getDevice from './getDevice';
import getGroupDevicesData from './getGroupDevicesData';
import getGroupDevicesDetail from './getGroupDevicesDetail';
import getGroupDevicesSimple from './getGroupDevicesSimple';
import getOrganizationDevicesDetail from './getOrganizationDevicesDetail';
import getOrganizationDevicesSimple from './getOrganizationDevicesSimple';
import postComment from './postComment';
import postDevice from './postDevice';

/**
 * Device Service
 * ## method
 */

export default class DeviceService {
    static async getAllDevices(): Promise<IDataTable> {
        return await getAllDevices();
    }

    static async postDevice(deviceId: string, deviceType: number): Promise<IDevice> {
        return await postDevice(deviceId, deviceType)
    }

    static async postComment(deviceId: string, comment: string): Promise<boolean> {
        return await postComment(deviceId, comment);
    }

    static async getOrganizationDevicesSimple(orgId: string): Promise<IDevice[]> {
        return await getOrganizationDevicesSimple(orgId);
    }

    static async getOrganizationDevicesDetail(orgId: string): Promise<IDataTable> {
        return await getOrganizationDevicesDetail(orgId);
    }

    static async getGroupDevicesSimple(groupId: string): Promise<IDevice[]> {
        return await getGroupDevicesSimple(groupId);
    }

    static async getGroupDevicesDetail(groupId: string) {
        return await getGroupDevicesDetail(groupId);
    }

    static async getGroupDevicesData(groupId: string): Promise<IDataTable> {
        return await getGroupDevicesData(groupId);
    }

    static async addDevicesToOrganization(orgId: string, deviceIds: string[]): Promise<boolean> {
        return await addDevicesToOrganization(orgId, deviceIds);
    }

    static async addDevicesToGroup(groupId: string, deviceIds: string[]): Promise<boolean> {
        return await addDevicesToGroup(groupId, deviceIds);
    }

    static async getDevice(deviceId: string): Promise<IDevice> {
        return await getDevice(deviceId);
    }
}