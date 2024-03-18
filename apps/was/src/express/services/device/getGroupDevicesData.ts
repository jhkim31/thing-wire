import DeviceDal from "src/express/dals/device";
import IDataTable from "shared/interface/ui/IDataTable";
import dateToLocaleString from "shared/lib/dateToLocaleString";
import axios from "axios";

export default async function getGroupDevicesData(groupId: string): Promise<IDataTable> {
    const AllDeviceDatasUrl = process.env.KETI_V1_SENSORS_URL ?? "http://keti1.energyiotlab.com:30101/v1/sensors";
    const devices = await DeviceDal.getGroupDevices(groupId);
    const deviceIds = new Set(devices.map((device) => device.id.toUpperCase()));
    const deviceIdsCheck = new Set<string>();
    deviceIds.forEach(i => deviceIdsCheck.add(i));

    const tableHeader: Set<string> = new Set(["name", "id", "last updated time"]);
    const tableBody: { [key: string]: string }[] = [];
    const AllDeviceDatas: { [groupName: string]: { [deviceId: string]: any } } = await axios
        .get(AllDeviceDatasUrl, { timeout: 3000 })
        .then((d) => {
            if (d.status == 200) {
                return d.data;
            }
        });
    /**
     * TODO
     * schema 검증
     */

    for (const [groupName, group] of Object.entries(AllDeviceDatas)) {
        if (typeof group != "object") {
            continue;
        }
        for (const [deviceName, device] of Object.entries(group)) {
            try {
                const deviceId = (device?.["data"]?.["node_info"]?.[1]?.["info"]?.["mac"] ?? "").toUpperCase();
                if (typeof device != "object" || deviceId == "") {
                    continue;
                }

                if (deviceIds.has(deviceId)) {
                    const tableRow: any = {};
                    tableRow["name"] = deviceName;
                    tableRow['id'] = deviceId;
                    tableRow["last updated time"] = dateToLocaleString(new Date(parseInt(device?.["service"]["timestamp"]) * 1000));
                    for (const [sensor, data] of Object.entries(device["data"]["sensors"])) {
                        tableHeader.add(sensor);
                        if (typeof data == "number" || typeof data == "string") {
                            const t = typeof data == "number" ? data.toFixed(4) : parseFloat(data).toFixed(4);
                            tableRow[sensor] = t;
                        } else if (typeof data == "object" && data !== null && "value" in data) {
                            const t = typeof data.value == "number" ? data.value.toFixed(4) : typeof data.value == "string" ? parseFloat(data.value).toFixed(4) : "-";
                            tableRow[sensor] = t;
                        }
                    }
                    tableBody.push(tableRow);

                    deviceIdsCheck.delete(deviceId);
                }
            } catch (e: unknown) {

            }
        }
    }

    deviceIdsCheck.forEach(i => {
        tableBody.push({name: i, id: i})
    });

    return { tableHeader: Array.from(tableHeader), tableBody: tableBody };
}