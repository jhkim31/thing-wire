import 'reactjs-popup/dist/index.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { styled } from 'styled-components';

import api from '@api';
import DataTable from '@components/modules/shared/DataTable';
import { SELECT_DEVICE } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IOrganization from 'shared/interface/organization/IOrganization';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const NavBar = styled.div`
    padding: 20px;
`;

/**
 * # Component
 * Admin 페이지에서 모든 장치들을 확인하고, 각 org로 전달하기 위한 컴포넌트
 */
export default function AllRegistedDeviceList() {
    const dispatch = useDispatch();
    const checkable = true;
    const [errMsg, setErrMsg] = useState<string>("");
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableBody, setTableBody] = useState<{ [key: string]: string }[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set([]));

    useEffect(() => {
        setErrMsg("");
        api.get(`/devices?detail=true`)
            .then(d => {
                if (d.data.header.status != "success") {
                    throw new Error(d.data.header.message);
                }
                setTableHeader(d.data.body.tableHeader);
                setTableBody(d.data.body.tableBody);
            })
            .catch((e: unknown) => {
                if (e instanceof Error) {
                    setErrMsg(`e : ${e.message}`);
                } else {
                    setErrMsg("알 수 없는 에러 발생.");
                }
            })
    }, []);

    function rowClickFunc(deviceId: string, deviceName: string) {
        window.location.pathname = `/devices/${deviceId}`;
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

    if (errMsg == "") {
        return (
            <Wrapper>
                <NavBar>
                    <Popup trigger={<button>조직 추가</button>} modal nested>
                        {(close: () => void) => (
                            <>
                                <AddOrgs close={close} devices={selectedRowIds}></AddOrgs>
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
                    showIdColumn={true}
                    tableBody={tableBody}
                    tableHeader={tableHeader}
                    selectable={checkable}
                    selectedRowIds={selectedRowIds}
                    setSelectedRowIds={SelectRowFunc}
                    allSelectFunc={AllSelectFunc}
                />
            </Wrapper>
        );
    } else {
        return (
            <div>{errMsg}</div>
        )
    }
}

function AddOrgs(props: { close: () => void; devices: Set<string> }) {
    const close = props.close;    
    const selectDevices = props.devices;
    const [organizations, setOrganizations] = useState<IOrganization[]>([]);
    const [selectOrg, setSelectOrg] = useState("");
    function postOrgDevices() {
        api.post(`/orgs/${selectOrg}/devices`, {
            devices: Array.from(selectDevices.values()),
        }).then((d) => {
            close();
            window.location.reload();
        });
    }

    useEffect(() => {
        api.get("/orgs")
            .then((d) => {
                const orgs = statusHandler<IOrganization[]>(d);
                setOrganizations(orgs);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div>
            <div>
                <input
                    list="brow"
                    onChange={(e) => {
                        setSelectOrg(e.target.value);
                    }}
                />
                <datalist id="brow">
                    {organizations.map((organization: any) => {
                        return <option value={organization.id} label={organization.name} />;
                    })}
                </datalist>
                <button onClick={postOrgDevices}>조직 추가</button>
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
