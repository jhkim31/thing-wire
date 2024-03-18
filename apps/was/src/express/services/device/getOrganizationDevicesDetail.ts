import IDataTable from 'shared/interface/ui/IDataTable';
import DeviceDal from 'src/express/dals/device';

export default async function getOrganizationDevicesDetail(orgId: string): Promise<IDataTable> { 
    const devices = await DeviceDal.getOrganizationDevices(orgId);
    const tableHeader = ["name", "id", "groups", "comment"];
    const tableBody: { [key: string]: string }[] = [];

    for (const device of devices) {
        const t: { [key: string]: string } = {};
        t["name"] = device.name;
        t["id"] = device.id;
        let orgStr = "";
        for (const group of device?.groups ?? []) {
            orgStr += `${group.name} | `;
        }
        t["groups"] = orgStr;
        t["comment"] = device.comment ?? "";
        tableBody.push(t);
    }

    return { tableHeader: tableHeader, tableBody: tableBody };   
}