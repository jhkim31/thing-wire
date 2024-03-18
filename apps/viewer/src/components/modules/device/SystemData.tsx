import api from "@api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

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
    & > :nth-child(1) {
        font-size: 1.5em;
    }
`;

const SystemData = () => {
    const params = useParams();
    const deviceId = params.device_id ?? "";
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [data, setData] = useState<any>();
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
    const [commentSaved, setCommentSaved] = useState(true);
    const [sensorConfig, setSensorConfig] = useState("");
    const [systemData, setSystemData] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        api.get(`/devices/${deviceId}/systemdata`).then((d) => {            
            const results = d.data.data.queries.results;
            setData(d.data.data.queries);
            setCpuTotal(parseFloat(results["cpuCore"]));
            setCpuLoadavg(parseFloat(results["cpu"]));
            setMemTotal(parseFloat(results["memTotal"]) / 1024 / 1024);
            setMemAvailable(parseFloat(results["memAvailable"]) / 1024 / 1024);
            setCpuTemp(parseFloat(results["cpuTemp"]) / 1000);
            setDiskTotal(parseFloat(results["diskTotal"]));
            setDiskUsage(parseFloat(results["diskUsage"]));
            setMac(results["mac"]);
            setIp(results["ip"]);
            setSsid(results["ap-ssid"]);
            setUptime(results["uptime"]);
            setSensorConfig(results["sensor-config"]);
            setComment(d.data.comment);
        });
    }, []);

    function changeComment(c: string) {
        setCommentSaved(false);
        setComment(c);

        if (timer) {
            console.log("clear timeout", timer);
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            api.post(`/devices/${deviceId}/comment`, { comment: c }).then((d) => {
                setCommentSaved(true);
            });
        }, 1_000);
        setTimer(newTimer);
    }

    function changeSensorConfig(c: string) {        
        setSensorConfig(c);
    }
    return (
        <Wrapper>
            <FlexItem>
                <div>CPU TEMPERATURE</div>
                <div>{cpuTemp.toFixed(1)}C</div>
            </FlexItem>
            <FlexItem>
                <div>CPU</div>
                <div>
                    {cpuLoadAvg} / {cpuTotal}
                </div>
            </FlexItem>
            <FlexItem>
                <div>MEMORY</div>
                <div>
                    {(memTotal - memAvailable).toFixed(1)}G / {memTotal.toFixed(1)}G
                </div>
            </FlexItem>
            <FlexItem>
                <div>DISK</div>
                <div>
                    {diskUsage}G / {diskTotal}G
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
                <div>COMMENT {commentSaved ? "saved" : "saving..."}</div>
                <textarea
                    rows={10}
                    value={comment}
                    onChange={(e) => {
                        changeComment(e.target.value);
                    }}
                />
            </FlexItem>
            <FlexItem>
                <div>SENSOR-CONFIG</div>
                <textarea
                    rows={30}
                    wrap={"off"}
                    value={sensorConfig}                    
                    onChange={(e) => {
                        changeSensorConfig(e.target.value);
                    }}
                />
            </FlexItem>
        </Wrapper>
    );
};

export default SystemData;
