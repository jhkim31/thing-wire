import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { styled } from "styled-components";

import api from "@api";
import { statusHandler } from "@lib/axios";

const Wrapper = styled.div`    
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: 150px 1fr;
`;

const Header = styled.div`    
    height: 100%;
    position: sticky;
    top: 0;
`;

const CommandResultBody = styled.div`
    height: 100%;    
    overflow: auto;
`

/**
 * # Component
 * 장치에 명령을 보내기 위한 컴포넌트
 * @returns 
 */
const Command = () => {
    const params = useParams();
    const deviceId = params.device_id ?? "";
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<any>(null);
    const [command, setCommand] = useState("");
    const [result, setResult] = useState<{ command: string; result: string; }[]>([]);

    const handlChange = (file: any) => {
        setFile(file);
        const formData = new FormData();

        formData.append("file", file);
        api.post(`/devices/${deviceId}/files`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };
    function submit() {
        setLoading(true);
        api.post(`/devices/${deviceId}/commands`, { type: "command", command: command }, { timeout: 10000 })
            .then((d) => {
                const commandResult = statusHandler<{ command: string; result: string; }>(d);
                setResult((result: { command: string; result: string; }[]) => {
                    result.push(commandResult);
                    return result;
                });
                setLoading(false);
                setCommand("");
            });
    }
    return (
        <Wrapper>
            <Header>
                <h1> Device Command {deviceId}</h1>
                <input placeholder="명령" value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e => {
                        if (e.key === "Enter"){
                            submit();
                        }                        
                    })} />
                <button onClick={submit}>전송</button>
                <span>{loading && "로딩중..."}</span>
                {/* <FileUploader handleChange={handlChange} name="file"></FileUploader> */}
            </Header>
            <CommandResultBody>
                {result.map((commandResult) => {
                    return (
                        <div>
                            <div>
                                <strong>{commandResult.command}</strong>
                            </div>
                            {commandResult.result.split("\n").map((row: string) => {
                                return <div>{row}</div>;
                            })}
                            <hr />
                        </div>
                    );
                })}
            </CommandResultBody>
        </Wrapper>
    );
};

export default Command;
