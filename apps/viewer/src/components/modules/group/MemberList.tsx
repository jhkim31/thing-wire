import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IUser from 'shared/interface/user/IUser';

import api from '@api';
import { UserIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { statusHandler } from '@lib/axios';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

export default function MemberList() {
    const params = useParams();
    const orgId = params.org_id ?? "";
    const groupId = params.group_id ?? "";

    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IUser>[]>([]);

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups/${groupId}/members`)
            .then((d) => {
                const users = statusHandler<IUser[]>(d);
                setSimpleListItem(users.map((user: IUser) => {
                    return {
                        id: user.id,
                        label1: user.name,
                        origin: user
                    }
                }))
            });
    }, []);
    return (
        <SimpleList
            items={simpleListItem}
            icon={UserIcon}
            header={"멤버"}
            itemBaseUrl={`/orgs/${orgId}/groups/${groupId}/members/`}
            controlUrl={`/orgs/${orgId}/groups/${groupId}/members`}
        />
    );
};

