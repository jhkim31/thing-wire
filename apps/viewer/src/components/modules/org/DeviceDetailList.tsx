import 'reactjs-popup/dist/index.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { styled } from 'styled-components';

import api from '@api';
import DataTable from '@components/modules/shared/DataTable';
import { SELECT_DEVICE } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IDataTable from 'shared/interface/ui/IDataTable';
import IGroup from 'shared/interface/group/IGroup';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const NavBar = styled.div`
    padding: 20px;
`;

export default function DeviceDetailList() {
    const params = useParams();
    const orgId = params.org_id ?? "";
    const dispatch = useDispatch();
    const checkable = true;
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableBody, setTableBody] = useState<{ [key: string]: string }[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set([]));

    useEffect(() => {
        api.get(`/orgs/${orgId}/devices?detail=true`)
            .then((d) => {
                const dataTable = statusHandler<IDataTable>(d);
                setTableHeader(dataTable.tableHeader);
                setTableBody(dataTable.tableBody);
            })
            .catch((e) => {
                console.error(e);

            });
    }, []);

    function rowClickFunc(deviceId: string, deviceName: string) {
        window.location.pathname = `/orgs/${orgId}/devices/${deviceId}`;
        dispatch({
            type: SELECT_DEVICE,
            data: {
                device: {
                    name: deviceName,
                    id: deviceId,
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
        <Wrapper>
            <NavBar>
                <Popup trigger={<button>그룹 추가</button>} modal nested>
                    {(close: () => void) => (
                        <>
                            <AddGroup close={close} devices={selectedRowIds}></AddGroup>
                        </>
                    )}
                </Popup>
                <Popup trigger={<button>주석 추가</button>} modal nested>
                    {(close: () => void) => (
                        <>
                            <AddComment close={close} devices={selectedRowIds}></AddComment>
                        </>
                    )}
                </Popup>
            </NavBar>
            <DataTable
                rowClickFunc={rowClickFunc}
                showIdColumn={false}
                tableBody={tableBody}
                tableHeader={tableHeader}
                selectable={checkable}
                selectedRowIds={selectedRowIds}
                setSelectedRowIds={SelectRowFunc}
                allSelectFunc={AllSelectFunc}
            />
        </Wrapper>
    );
}

function AddGroup(props: { close: () => void; devices: Set<string> }) {
    const params = useParams();
    const orgId = params.org_id ?? "";
    const close = props.close;
    const selectDevices = props.devices;
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [selectGroup, setSelectGroup] = useState("");

    function postOrgDevices() {
        api.post(`/orgs/${selectGroup}/groups/${selectGroup}/devices`, {
            devices: Array.from(selectDevices.values()),
        })
            .then((d) => {
                console.log(d.data);
                close();
                window.location.reload();
            });
    }

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups`)
            .then((d) => {
                const groups = statusHandler<IGroup[]>(d);
                setGroups(groups);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div>
            <div>
                <input
                    list="brow"
                    onChange={(e) => {
                        setSelectGroup(e.target.value);
                    }}
                />
                <datalist id="brow">
                    {groups.map((group: IGroup) => {
                        return <option value={group.id} label={group.name} />;
                    })}
                </datalist>
                <button onClick={postOrgDevices}>그룹 추가</button>
                <button onClick={close}>close</button>
            </div>
        </div>
    );
}


function AddComment(props: { close: () => void; devices: Set<string> }) {
    const close = props.close;
    const selectDeviceIds = Array.from(props.devices);
    const [comment, setComment] = useState("");

    function postOrgDevices() {
        const promises = [];
        for (const deviceId of selectDeviceIds) {
            promises.push(api.post(`/devices/${deviceId}/comment`, { comment: comment }));
        }

        Promise.all(promises).then((d) => {
            close();
            window.location.reload();
        });
    }

    return (
        <div>
            <div>
                <input
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
                <button onClick={postOrgDevices}>주석 추가</button>
                <button onClick={close}>close</button>
            </div>
        </div>
    );
}
