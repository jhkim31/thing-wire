import IDataTable from 'shared/interface/ui/IDataTable';
import dateToLocaleString from 'shared/lib/dateToLocaleString';
import OrgDal from 'src/express/dals/organization';

export default async function getOrgsDetail(userId: string): Promise<IDataTable> {
    const orgs = await OrgDal.getUserJoinedOrgs(userId);

    const tableHeader = ["name", "id", "created at", "owner", "users", "groups", "devices", "roles", ];
    const tableBody: { [key: string]: string }[] = [];

    for (const organization of orgs) {
        const orgInfo: { [key: string]: string } = {};
        orgInfo["name"] = organization.name;
        orgInfo["id"] = organization.id;
        orgInfo["created at"] = dateToLocaleString(organization.createdAt);
        orgInfo["owner"] = organization?.owner?.name ?? "-";
        orgInfo["users"] = `${organization?.users?.length ?? -1}`;
        orgInfo["groups"] = `${organization?.groups?.length ?? -1}`;
        orgInfo["devices"] = `${organization?.devices?.length ?? -1}`;
        orgInfo["roles"] = `${organization?.roles?.length ?? -1}`;        

        tableBody.push(orgInfo);
    }

    return { tableHeader: tableHeader, tableBody: tableBody };
}