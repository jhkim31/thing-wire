import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DeviceDataChart from '@components/modules/shared/DeviceDataChart';
import { isEqual } from 'lodash';

export default function DeviceDataChart_Interaction(){    
    const deviceId = useSelector((state: State) => state.interaction.org.main.selectedDeviceId, isEqual);
    
    return(
        <>
            {deviceId != "" && <DeviceDataChart deviceId={deviceId} />}
        </>        
    )
}