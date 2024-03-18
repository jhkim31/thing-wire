export default function deviceTypeParser(deviceType: number): string {
    switch(deviceType) {
        case 1:
            return "ENV_SENSOR";
        case 2:
            return "CAMERA";
        case 3:
            return "SERVER";
        default:
            return "UNKNOWN";
    }
}