import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IOrganization from 'shared/interface/organization/IOrganization';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

import api from '@api';
import { OrgIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { statusHandler } from '@lib/axios';
import { SELECT_ORG } from '@redux/Action';

export default function MainOrgList() {
    const dispatch = useDispatch();
    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IOrganization>[]>([]);

    useEffect(() => {
        if (simpleListItem.length === 0){            
            api.get(`/orgs`)
            .then((d) => {
                const orgs = statusHandler<IOrganization[]>(d);             
                                
                setSimpleListItem(orgs.map((organization: IOrganization) => {
                    return {
                        id: organization.id,
                        label1: organization.name,   
                        origin: organization                     
                    }
                }))             
            });
        }
    }, []);

    function selectOrg(org: IOrganization) {
        dispatch({
            type: SELECT_ORG,
            data: {
                org: org,
            },
        });
    }
    return (
        <SimpleList
            itemSelectFunc={selectOrg}
            items={simpleListItem}
            icon={OrgIcon}
            header={"조직"}
            itemBaseUrl={"/orgs/"}
            controlUrl={"/orgs"}
            btnValue={"조직관리"}
        />
    );
};
