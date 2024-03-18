import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';
import { CameraDevice, EnvDevice } from '@components/icons';

import api from '@api';
import { DeviceIcon } from '@components/icons';
import config from '@config';
import { COMP_INTERACTION_SELECT_DEVICE, COMP_INTERACTION_SELECT_VIEW } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IDevice from 'shared/interface/device/IDevice';
import { isEqual } from 'lodash';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;    
    display: grid;
    grid-template-rows: 80px 1fr;
    padding: 30px;
`;

const Header = styled.div`
    font-size: ${config.style.Dashboard["fontSize"]};
    color: ${config.style.Dashboard["color"]};    
`;

const GridRow0 = styled.div`
    display: flex;
    justify-content: space-between;
`;

const GridRow1 = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Item = styled.div<{ bgColor: string }>`
    background: ${(p) => p.bgColor};
    font-size: 0.9em;
    padding: 5px 10px;
    &:hover {
        background: ${config.style["list-item-hover-color"]};
    }
    display: flex;
    justify-content: space-between;
`;

export default function DeviceList() {
    const dispatch = useDispatch();
    const params = useParams();
    const orgId = params.org_id ?? "";
    const [devices, setDevices] = useState<IDevice[]>([]);
    const selectedGroupId = useSelector((state: State) => state.interaction.org.main.selectedGroupId, isEqual);
    const selectedDeviceId = useSelector((state: State) => state.interaction.org.main.selectedDeviceId, isEqual);

    useEffect(() => {
        if (selectedGroupId != "") {
            api.get(`/orgs/${orgId}/groups/${selectedGroupId}/devices`)
                .then((d) => {
                    const devices = statusHandler<IDevice[]>(d);
                    setDevices(devices);
                })
                .catch((e) => {
                    console.error(e);
                    setDevices([]);
                });
        }
    }, [selectedGroupId]);

    function select(deviceId: string) {
        if (selectedDeviceId == deviceId) {
            deviceId = "";            
        }
        
        dispatch({
            type: COMP_INTERACTION_SELECT_DEVICE,
            data: {
                deviceId: deviceId,
            },
        });
    }
    if (selectedGroupId !== "") {
        return (
            <Wrapper>
                <GridRow0>
                    <Header>{DeviceIcon} 장치</Header>
                    <Header>{devices.length}</Header>
                </GridRow0>
                <GridRow1>
                    {devices.map((device) => {
                        let bgColor = "white";
                        if (device.id == selectedDeviceId) {
                            bgColor = config.style["list-item-hover-color"];
                        }
                        return (
                            <Item
                                key={Math.random()}
                                onClick={() => {
                                    select(device.id);
                                }}
                                bgColor={bgColor}
                            >
                                <span>{device.name}</span>
                                <span>{device.type === 1 ? EnvDevice : CameraDevice}</span>
                            </Item>
                        );
                    })}
                </GridRow1>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper></Wrapper>
        )
    }
    
}
