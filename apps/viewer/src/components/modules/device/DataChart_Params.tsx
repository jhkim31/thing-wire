import { useParams } from "react-router-dom";
import DeviceDataChart from "@components/modules/shared/DeviceDataChart";


export default function DataChart_Params(){
    const params = useParams();
    const deviceId = params.device_id ?? "";
    
    return(
        <DeviceDataChart deviceId={deviceId} />
    )
}