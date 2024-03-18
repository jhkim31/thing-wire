import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import IDevice from 'shared/interface/device/IDevice';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

import api from '@api';
import { DeviceIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { statusHandler } from '@lib/axios';
import { SELECT_DEVICE } from '@redux/Action';

export default function DeviceList() {
    const params = useParams();
    const orgId = params.org_id;
    const dispatch = useDispatch();

    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IDevice>[]>([]);
    useEffect(() => {
        api.get(`/orgs/${orgId}/devices`)
            .then((d) => {
                const devices = statusHandler<IDevice[]>(d);
                setSimpleListItem(devices.map((device: IDevice) => {
                    return {
                        id: device.id,
                        label1: device.name,                        
                        origin: device
                    }
                }))
            });
    }, []);

    function selectDevice(device: IDevice) {
        dispatch({
            type: SELECT_DEVICE,
            data: {
                device: device,
            },
        });
    }

    return (
        <SimpleList
            btnValue='장치관리'
            items={simpleListItem}
            itemSelectFunc={selectDevice}
            icon={DeviceIcon}
            header={"장치"}
            itemBaseUrl={`/orgs/${orgId}/devices/`}
            controlUrl={`/orgs/${orgId}/devices`}
        />
    );
};