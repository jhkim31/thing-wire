import '@styles/modules/DeviceTerminal.scss';

import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';

import TerminalView from '@components/modules/shared/TerminalView';
import { isEqual } from 'lodash';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;    
`

export default function Terminal_Interaction() {
    const deviceId = useSelector((state: State) => state.interaction.org.main.selectedDeviceId, isEqual);

    return (
        <Wrapper>
            <TerminalView deviceId={deviceId} />
        </Wrapper>
    )   
}
