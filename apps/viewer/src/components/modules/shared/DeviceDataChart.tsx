import { AxiosError } from 'axios';
import { CategoryScale, Chart as ChartJS, ChartData, ChartDataset, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ITsdbData from 'shared/interface/tsdb/ITsdbData';
import { styled } from 'styled-components';

import api from '@api';
import { statusHandler } from '@lib/axios';

const Wrapper1 = styled.div`
    width: 100%;
    height: 100%;
    padding:10px;
    position: relative;
    display: grid;
    grid-template-rows: 25px 1fr;
`;

const Wrapper2 = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Blind = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;    
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: 500;
`

function dateToLocaleString(d: Date): string {
    return d.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: 'h23',
        timeZone: "Asia/Seoul"
    });
}

interface props {
    deviceId: string;
}

export default function DeviceDataChart(props: props) {
    const deviceId = props.deviceId ?? "";
    const [startAt, setStartAt] = useState("1h-ago");
    const [dataLoading, setDataLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [showLabels, setShowLabels] = useState(true);
    const [timeout, setTimeout] = useState(false);
    const [labels, setLabels] = useState<string[]>([]);
    const [datasets, setDataSets] = useState<ChartDataset<"line", { x: string; y: number }[]>[]>([]);

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [chartData, setChartData] = useState<ChartData<"line", { x: string; y: number }[]>>({
        labels: [],
        datasets: [],
    });

    const chartOptions: ChartOptions<"line"> = {
        scales: {
            x: {
                beginAtZero: false,
                ticks: {
                    maxTicksLimit: 5,
                },
            },
        },
        plugins: {
            tooltip: {
                mode: "index",
                intersect: false,
            },
            legend: {
                position: "top" as const,
            },
        },
        hover: {
            mode: "index",
            intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    function dynamicColors() {
        const colors = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
            "#800000",
            "#008000",
            "#000080",
            "#808000",
            "#800080",
            "#008080",
            "#FF8000",
            "#FF0080",
            "#80FF00",
            "#00FF80",
            "#8000FF",
            "#0080FF",
            "#FF8080",
            "#80FF80",
            "#8080FF",
            "#C00000",
            "#00C000",
            "#0000C0",
            "#C0C000",
            "#C000C0",
            "#00C0C0",
            "#FFC000",
            "#FF00C0",
            "#C0FF00",
            "#00FFC0",
            "#C000FF",
            "#00C0FF",
            "#FFC0C0",
            "#C0FFC0",
            "#C0C0FF",
            "#400000",
            "#004000",
            "#000040",
            "#404000",
            "#400040",
            "#004040",
            "#C04000",
            "#C00040",
            "#40C000",
            "#00C040",
            "#4000C0",
            "#00C040",
            "#C08040",
            "#40C080",
            "#4040C0",
            "#804000",
            "#800040",
            "#408000",
            "#004080",
            "#400080",
            "#008040",
            "#804080",
            "#408080",
            "#404080",
            "#C08080",
            "#8080C0",
            "#C08080",
            "#80C080",
            "#8080C0",
            "#80C0C0",
            "#FF4000",
            "#FF0040",
            "#40FF00",
            "#00FF40",
            "#4000FF",
            "#00C0C0",
            "#FF4040",
            "#40FF40",
            "#4040FF",
            "#C08040",
            "#80C040",
            "#4080C0",
            "#FF8040",
            "#FF4080",
            "#40FF80",
            "#80FF40",
            "#4080FF",
            "#C0C040",
            "#C040C0",
            "#40C0C0",
            "#C0C080",
            "#80C0C0",
            "#C080C0",
            "#FFC040",
            "#FF40C0",
            "#C0FF40",
            "#40FFC0",
            "#C040FF",
            "#40C0FF",
            "#FFC0C0",
            "#C0FFC0",
            "#C0C0FF",
            "#C0C0FF",
            "#000000",
        ];
        const i = Math.floor(Math.random() * 100);
        return [colors[i], colors[i] + "80"];
    }

    useEffect(() => {
        (async () => {
            const labelSet = new Set<string>();
            const fucking: any = {};
            setDataLoading(true);
            setTimeout(false);
            setDataSets([]);
            const query_result = await api
                .get(`/devices/${deviceId}/tsdbdata?startAt=${startAt}`)
                .then((d) => {
                    const query_result = statusHandler<ITsdbData[]>(d);
                    return query_result;                    
                })
                .catch((err: AxiosError) => {
                    if (err.code == "ECONNABORTED") {
                        console.error(err.message);
                        setDataLoading(false);
                        setTimeout(true);
                    }
                    return [];
                });
            const tmp = [];
            for (const sensor_data of query_result) {
                const label = sensor_data?.tags?.sensor ?? "";
                fucking[label] = [];

                const data: { x: string; y: number }[] = Object.entries(sensor_data?.dps ?? {}).map(([key, value]) => {
                    labelSet.add(key);
                    const t = {
                        x: dateToLocaleString(new Date(parseInt(key) * 1000)),
                        y: value as number,
                    };

                    return t;
                });
                const colors = dynamicColors();

                tmp.push({
                    label: label,
                    data: data,
                    borderColor: colors[0],
                    backgroundColor: colors[0],
                    hidden: !showLabels
                });
            }
            setDataSets(tmp);
            setLabels(() => {
                const l = Array.from(labelSet).map((i: string) => dateToLocaleString(new Date(parseInt(i) * 1000)));
                l.sort();
                return l;
            })
            setDataLoading(false);
        })();
    }, [startAt, retryCount]);

    useEffect(() => {
        setChartData({
            labels: labels,
            datasets: datasets
        });
    }, [labels, datasets])

    return (
        <Wrapper1>
            <div>
                <select id="startAt" onChange={(e) => setStartAt(e.target.value)}>
                    <option>1d-ago</option>
                    <option>12h-ago</option>
                    <option selected>1h-ago</option>
                    <option>5m-ago</option>
                </select>
                <button onClick={() => {
                    const tmp = datasets.map(i => {
                        i.hidden = showLabels;
                        return i;
                    });
                    setShowLabels(prev => !prev);
                    setChartData({ labels: labels, datasets: tmp });
                }}
                    style={{ marginLeft: "30px" }}>{showLabels ? "hide all label" : "show all label"}</button>
            </div>
            <Wrapper2>
                {dataLoading && <Blind>Loading...</Blind>}
                {timeout && <Blind>Timeout. 다시 시도해 주세요.  <span onClick={() => setRetryCount(prev => ++prev)} style={{cursor: "pointer"}}>🔄</span></Blind>}
                <Line options={chartOptions} data={chartData} />
            </Wrapper2>
        </Wrapper1>
    );
}

// export default React.memo(DeviceDataChart);
