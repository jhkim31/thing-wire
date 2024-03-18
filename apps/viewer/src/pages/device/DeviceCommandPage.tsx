import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useParams } from 'react-router-dom';

import api from '@api';

const DeviceCommandPage = () => {    
    const params = useParams();
    const deviceId = params.device_id ?? "";
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<any>(null);
    const [command, setCommand] = useState("");
    const [result, setResult] = useState<any>([]);

    const handlChange = (file: any) => {
        setFile(file);
        const formData = new FormData();

        formData.append("file", file);
        api.post(`/devices/${deviceId}/upload`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
    }
    function submit() {        
        setLoading(true);
        api.post(`/devices/${deviceId}/command`, {type: "command", commands: [command]})
        .then(d => {
            console.log(d.data)
            if (d.data.content){
                setResult((result: any) => {                
                    result.push(d.data.content.result)
                    return result;
                });            
                setLoading(false);
            } else {
                const t: any = {};
                t[command] = "timeout";
                setResult((result: any) => {                
                    result.push(t);
                    return result;
                });            
                setLoading(false);
            }            
        })        
    }
    return (
        <div>
            <h1> Device Command  {deviceId}</h1>
            <input placeholder="명령"  value={command} onChange={e => setCommand(e.target.value)}/>
            <button onClick={submit}>전송</button>            
            <span>{loading && "로딩중..."}</span>
            <FileUploader handleChange={handlChange} name="file"></FileUploader>
            {result.map((item: any) => {
                const command = Object.keys(item)[0] ?? "";
                return(
                    <div>
                        <div><strong>{command}</strong></div>
                        {item[command].split('\n').map((row:string) => {
                            return (<div>{row}</div>)
                        })}
                    <hr />
                    </div>                    
                )
            })}            
        </div>
    );
};

export default DeviceCommandPage;
