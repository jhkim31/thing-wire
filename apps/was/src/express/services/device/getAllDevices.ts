import IDataTable from 'shared/interface/ui/IDataTable';
import dateToLocaleString from 'shared/lib/dateToLocaleString';
import DeviceDal from 'src/express/dals/device';
import deviceTypeParser from "shared/lib/deviceTypeParser";

export default async function getAllDevices(): Promise<IDataTable> {
    const tableHeader = ["name", "id", "type", "registed", "organizations", "comment"];
    const tableBody: { [key: string]: string }[] = [];
    const devices = await DeviceDal.getAllDevices();

    for (const device of devices) {
        const t: { [key: string]: string } = {};
        t["name"] = device.name;
        t["id"] = device.id;
        t["type"] = deviceTypeParser(device.type);
        t["registed"] = dateToLocaleString(device.createdAt);
        let orgStr = "";
        for (const organization of device?.organizations ?? []) {
            orgStr += `${organization.name} | `;
        }
        t["organizations"] = orgStr;
        t["comment"] = device.comment ?? "";
        
        tableBody.push(t);        
    }

    return { tableHeader: tableHeader, tableBody: tableBody };
}
