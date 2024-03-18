import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import IGroup from 'shared/interface/group/IGroup';

import api from '@api';
import { GroupIcon } from '@components/icons';
import SimpleList from '@components/modules/shared/SimpleList';
import { SELECT_GROUP } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import SimpleListItem from 'shared/interface/viewer/SimpleListItem';

const GroupList = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const orgId = params.org_id ?? "";
    const [simpleListItem, setSimpleListItem] = useState<SimpleListItem<IGroup>[]>([]);
    
    useEffect(() => {
        api.get(`/orgs/${orgId}/groups`)
            .then((d) => {
                const groups = statusHandler<IGroup[]>(d);
                setSimpleListItem(groups.map((group: IGroup) => {
                    return {
                        id: group.id,
                        label1: group.name,  
                        origin: group                      
                    }
                }))
            });
    }, []);
    function selectGroup(group: IGroup) {
        dispatch({
            type: SELECT_GROUP,
            data: {
                group: group
            }
        })
    }
    return (
        <SimpleList
            btnValue='그룹관리'
            itemSelectFunc={selectGroup}
            items={simpleListItem}
            icon={GroupIcon}
            header={"그룹"}
            itemBaseUrl={`/orgs/${orgId}/groups/`}
            controlUrl={`/orgs/${orgId}/groups`}
        ></SimpleList>
    )
};

export default GroupList;
