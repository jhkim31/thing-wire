import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import api from '@api';
import { DeviceIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { SELECT_DEVICE } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IDevice from 'shared/interface/device/IDevice';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

export default function DeviceList() {
    const params = useParams();
    const dispatch = useDispatch();
    const orgId = params.org_id ?? "";
    const groupId = params.group_id ?? "";
    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IDevice>[]>([]);

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups/${groupId}/devices`)
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
            items={simpleListItem}
            itemSelectFunc={selectDevice}
            icon={DeviceIcon}
            header={"장치"}
            itemBaseUrl={`/orgs/${orgId}/groups/${groupId}/devices/`}
            controlUrl={`/orgs/${orgId}/groups/${groupId}/devices`}
        />
    );
}