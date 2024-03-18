import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DataTable from "@components/modules/shared/DataTable";

import api from "@api";
import { statusHandler } from "@lib/axios";
import IDataTable from "shared/interface/ui/IDataTable";

const DeviceDataTable = () => {
    const params = useParams();
    const orgId = params.org_id;
    const groupId = params.group_id;
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableBody, setTableBody] = useState<{ [key: string]: string }[]>([]);    

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups/${groupId}/device_data`)
            .then((d) => {
                const dataTable = statusHandler<IDataTable>(d);
                setTableHeader(dataTable.tableHeader);
                setTableBody(dataTable.tableBody);                    
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <DataTable defaultSortKey={"last updated time"} tableBody={tableBody} tableHeader={tableHeader} selectable={false}/>
    );
};

export default DeviceDataTable;
