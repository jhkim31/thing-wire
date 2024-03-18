import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';

import api from '@api';
import config from '@config';
import { statusHandler } from '@lib/axios';
import { isEqual } from 'lodash';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
    gap: 100px;
    overflow: auto;
`;

const FlexItem = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    & > :nth-child(1) {
        color: ${config.style.Dashboard["color"]};
        font-size: 1.1em;
        font-weight: 500;
    }
    & > :nth-child(2) {
        font-size: 0.9em;
    }
`;

const DeviceSystemData = () => {
    const params = useParams();
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [cpuTotal, setCpuTotal] = useState(0);
    const [cpuLoadAvg, setCpuLoadavg] = useState(0);
    const [memTotal, setMemTotal] = useState(0);
    const [memAvailable, setMemAvailable] = useState(0);
    const [cpuTemp, setCpuTemp] = useState(0);
    const [diskTotal, setDiskTotal] = useState(0);
    const [diskUsage, setDiskUsage] = useState(0);
    const [mac, setMac] = useState("");
    const [ip, setIp] = useState("");
    const [ssid, setSsid] = useState("");
    const [uptime, setUptime] = useState("");
    const [comment, setComment] = useState("");
    const [commentSaved, setCommentSaved] = useState(2);
    const commentStatus = ["error!", "saving...", "saved!"];    
    const [dataStatus, setDataStatus] = useState(0);
    const [docker, setDocker] = useState("");

    const selectedOrgId = params.org_id;
    const selectedGroupId = useSelector((state: State) => state.interaction.org.main.selectedGroupId, isEqual);
    const selectedDeviceId = useSelector((state: State) => state.interaction.org.main.selectedDeviceId, isEqual);

    useEffect(() => {
        if (selectedDeviceId != "") {
            setDataStatus(0);
            api.get(`/orgs/${selectedOrgId}/groups/${selectedGroupId}/devices/${selectedDeviceId}/systemdata`)
                .then((d) => {
                    const systemData = statusHandler<any>(d);
                    if (systemData.id == selectedDeviceId) {
                        setDataStatus(1);
                        const state = systemData.state;

                        setCpuTotal(parseFloat(state["cpuCore"]));
                        setCpuLoadavg(parseFloat(state["cpu"]));
                        setMemTotal(parseFloat(state["memTotal"]) / 1024 / 1024);
                        setMemAvailable(parseFloat(state["memAvailable"]) / 1024 / 1024);
                        setCpuTemp(parseFloat(state["cpuTemp"]) / 1000);
                        setDiskTotal(parseFloat(state["diskTotal"]));
                        setDiskUsage(parseFloat(state["diskUsage"]));
                        setMac(state["mac"]);
                        setIp(state["ip"]);
                        setSsid(state["ap-ssid"]);
                        setUptime(state["uptime"]);                        
                        setDocker(state["docker"]);
                        setComment(systemData.info.comment);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [selectedDeviceId]);

    function changeComment(c: string) {
        setCommentSaved(1);
        setComment(c);

        if (timer) {
            console.log("clear timeout", timer);
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            api.post(`/devices/${selectedDeviceId}/comment`, { comment: c })
                .then((d) => {
                    setCommentSaved(2);
                })
                .catch((e) => {
                    setCommentSaved(0);
                });
        }, 1_000);
        setTimer(newTimer);
    }

    return (
        <>
            {selectedDeviceId && (
                <>
                    {dataStatus == 0 && <div> 데이터를 가져오는 중입니다...(최대 3초)</div>}
                    {dataStatus == 1 && (
                        <Wrapper>
                            <FlexItem>
                                <div>CPU TEMPERATURE</div>
                                <div>{cpuTemp.toFixed(1)}℃</div>
                            </FlexItem>
                            <FlexItem>
                                <div>CPU CORE</div>
                                <div>
                                    {cpuLoadAvg} / {cpuTotal}
                                </div>
                            </FlexItem>
                            <FlexItem>
                                <div>MEMORY</div>
                                <div>
                                    {(memTotal - memAvailable).toFixed(1)} GiB / {memTotal.toFixed(1)} GiB
                                </div>
                            </FlexItem>
                            <FlexItem>
                                <div>DISK</div>
                                <div>
                                    {diskUsage} GiB / {diskTotal} GiB
                                </div>
                            </FlexItem>
                            <FlexItem>
                                <div>MAC</div>
                                <div>{mac}</div>
                            </FlexItem>
                            <FlexItem>
                                <div>IP</div>
                                <div>{ip}</div>
                            </FlexItem>
                            <FlexItem>
                                <div>SSID</div>
                                <div>{ssid}</div>
                            </FlexItem>
                            <FlexItem>
                                <div>UPTIME</div>
                                <div>{uptime}</div>
                            </FlexItem>
                            <FlexItem>
                                <div>DOCKER</div>
                                <textarea readOnly={true} cols={100} rows={10} wrap={"off"} value={docker} style={{ border: "0", resize: "vertical" }} />
                            </FlexItem>
                            <FlexItem>
                                <div>COMMENT {commentStatus[commentSaved]}</div>
                                <textarea
                                    rows={10}
                                    value={comment}
                                    onChange={(e) => {
                                        changeComment(e.target.value);
                                    }}
                                />
                            </FlexItem>                            
                        </Wrapper>
                    )}                   
                </>
            )}
        </>
    );
};

export default DeviceSystemData;
