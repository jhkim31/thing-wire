import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import api from '@api';
import DataTable from '@components/modules/shared/DataTable';
import { SELECT_GROUP } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IDataTable from 'shared/interface/ui/IDataTable';

const GroupDetailList = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const orgId = params.org_id ?? "";
    const checkable = true;
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableBody, setTableBody] = useState<{ [key: string]: string }[]>([]);
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState(-1);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set([]));
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups?detail=true`)
            .then((d) => {
                const dataTable = statusHandler<IDataTable>(d);
                setTableHeader(dataTable.tableHeader);
                setTableBody(dataTable.tableBody);
                sortTable("name");
            })
            .catch((e) => {
                console.error(e);
                setAccessDenied(true);
            });
    }, []);

    function sortTable(sk: string) {
        let newSortOrder = sortOrder;
        if (sortKey == sk) {
            newSortOrder *= -1;
        }
        setSortKey(sk);
        setSortOrder(newSortOrder);
        setTableBody((prevTable) => {
            prevTable.sort((a, b) => {
                if (a[sk] == undefined) {
                    return -1 * newSortOrder;
                }
                if (b[sk] == undefined) {
                    return 1 * newSortOrder;
                }
                if (isNaN(Number(a[sk])) && isNaN(Number(b[sk]))) {
                    if (a[sk] > b[sk]) {
                        return 1 * newSortOrder;
                    } else if (a[sk] < b[sk]) {
                        return -1 * newSortOrder;
                    } else {
                        return 0 * newSortOrder;
                    }
                } else {
                    if (parseFloat(a[sk]) > parseFloat(b[sk])) {
                        return 1 * newSortOrder;
                    } else if (parseFloat(a[sk]) < parseFloat(b[sk])) {
                        return -1 * newSortOrder;
                    } else {
                        return 0 * newSortOrder;
                    }
                }
            });
            return prevTable;
        });
    }

    function rowClickFunc(groupId: string, groupName: string) {
        window.location.pathname = `/orgs/${orgId}/groups/${groupId}`;
        dispatch({
            type: SELECT_GROUP,
            data: {
                group: {
                    name: groupName,
                    id: groupId,
                },
            },
        });
    }

    function SelectRowFunc(id: string) {
        setSelectedRowIds((prev) => {
            if (prev.has(id)) {
                prev.delete(id);
            } else {
                prev.add(id);
            }
            return new Set(prev);
        });
    }

    function AllSelectFunc() {
        setSelectedRowIds((prev) => {
            if (prev.size == tableBody.length) {
                return new Set([]);
            } else {
                const s: Set<string> = new Set([]);
                for (const item of tableBody) {
                    s.add(item["id"]);
                }
                return s;
            }
        });
    }

    return (
        <DataTable
            rowClickFunc={rowClickFunc}
            showIdColumn={false}
            tableBody={tableBody}
            tableHeader={tableHeader}
            selectable={checkable}
            custonBtn={[
                {
                    name: "그룹생성",
                    clickFunc: () => {
                        window.location.pathname = `/orgs/${orgId}/groups/new`;
                    },
                },
                {
                    name: "그룹삭제",
                    color: "#EB5347",
                    clickFunc: async () => {
                        const result = window.confirm(`${selectedRowIds.size}개의 그룹을 삭제하시겠습니까?`);
                        if (result) {
                            for (const groupId of Array.from(selectedRowIds)) {
                                await api.delete(`/orgs/${orgId}/groups/${groupId}`)
                                    .then(d => console.log(`${groupId}가 삭제되었습니다.`));
                            }
                            window.location.reload();
                        }
                    },
                },
            ]}
            selectedRowIds={selectedRowIds}
            setSelectedRowIds={SelectRowFunc}
            allSelectFunc={AllSelectFunc}
        />
    );
};

export default GroupDetailList;
