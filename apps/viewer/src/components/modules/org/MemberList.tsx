import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IUser from 'shared/interface/user/IUser';

import api from '@api';
import { UserIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { statusHandler } from '@lib/axios';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

export default function MemberList () {
    const params = useParams();
    const orgId = params.org_id ?? "";
    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IUser>[]>([]);
    
    useEffect(() => {
        api.get(`/orgs/${orgId}/members`)
        .then((d) => {
            const members = statusHandler<IUser[]>(d);
            setSimpleListItem(members.map((member: IUser) => {
                return {
                    id: member.id,
                    label1: member.name,                        
                    origin: member
                }
            }))
        });
    }, []);
    
    return (
        <SimpleList
            items={simpleListItem}
            icon={UserIcon}
            header={"멤버"}
            itemBaseUrl={`/orgs/${orgId}/members/`}
            controlUrl={`/orgs/${orgId}/members`}
        />
    );
};