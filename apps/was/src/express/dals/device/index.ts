import { Device } from '@db/models';

import addDevicesToGroup from './addDevicesToGroup';
import addDevicesToOrganization from './addDevicesToOrganization';
import getAllDevices from './getAllDevices';
import getDevice from './getDevice';
import getGroupDevices from './getGroupDevices';
import getOrganizationDevices from './getOrganizationDevices';
import postComment from './postComment';
import postDevice from './postDevice';

/**
 * Device Data Access Layer
 * @method getAllDevices
 * @method getOrganizationDevices
 * @method postDevice
 * @method postComment
 * @method getGroupDevices
 * @method addDevicesToOrganization
 * @method addDevicesToGroup
 * @method getDevice
 */
export default class DeviceDal {
    static async getAllDevices(): Promise<Device[]>{
        return await getAllDevices();
    }
    /**
     * Organization에 속한 모든 장치를 리턴합니다.
     * @param orgId 
     * @returns 
     */
    static async getOrganizationDevices(orgId: string): Promise<Device[]> {
        return await getOrganizationDevices(orgId);
    }

    static async postDevice(deviceId: string, deviceType: number): Promise<Device> {
        return await postDevice(deviceId, deviceType);
    }

    static async postComment(deviceId: string, comment: string): Promise<boolean> {
        return await postComment(deviceId, comment);
    }

    static async getGroupDevices(groupId: string): Promise<Device[]> {
        return await getGroupDevices(groupId);
    }

    static async addDevicesToOrganization(orgId: string, deviceIds: string[]): Promise<boolean> {
        return await addDevicesToOrganization(orgId, deviceIds);
    }

    static async addDevicesToGroup(groupId: string, deviceIds: string[]): Promise<boolean> {
        return await addDevicesToGroup(groupId, deviceIds);
    }   

    static async getDevice(deviceId: string) {
        return await getDevice(deviceId);
    }
}