import { Device } from "@db/models";
import IDevice from "shared/interface/device/IDevice";

/**
 * Sequelize 의 모델을 내부에서 사용 가능한 인터페이스로 변경한다.
 * 
 * {@link Device} => {@link IDevice}
 */
export default function DeviceParser(device: Device): IDevice {
    const deviceInfo: IDevice = {
        id: device.id,
        name: device.name,
        type: device.type,
        comment: device.comment        
    }
    return deviceInfo;
}