import IDataTable from 'shared/interface/ui/IDataTable';
import GroupDal from 'src/express/dals/group';
import dateToLocaleString from 'shared/lib/dateToLocaleString';

export default async function getOrganizationGroupsDetail(orgId: string): Promise<IDataTable> {
    const tableHeader = ["name", "id", "created at", "devices"];
    const tableBody: { [key: string]: string }[] = [];

    const groups = await GroupDal.getOrganizationGroups(orgId);

    for (const group of groups) {
        const t: { [key: string]: string } = {};
        t["name"] = group.name;
        t["id"] = group.id;
        t["created at"] = dateToLocaleString(group.createdAt);
        t["devices"] = `${group.devices?.length ?? 0}`;

        tableBody.push(t);
    }
    return {tableHeader, tableBody};
}
