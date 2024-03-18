import '@styles/modules/DeviceTerminal.scss';

import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import TerminalView from '@components/modules/shared/TerminalView';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;    
`

export default function Terminal_Interaction() {
    const params = useParams();
    const deviceId = params.device_id ?? "";

    return (
        <Wrapper>
            <TerminalView deviceId={deviceId} />
        </Wrapper>
    )   
}
