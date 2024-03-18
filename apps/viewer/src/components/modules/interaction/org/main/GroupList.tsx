import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';

import api from '@api';
import { GroupIcon } from '@components/icons';
import config from '@config';
import { COMP_INTERACTION_SELECT_DEVICE, COMP_INTERACTION_SELECT_GROUP } from '@redux/Action';
import { statusHandler } from '@lib/axios';
import IGroup from 'shared/interface/group/IGroup';
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
`;

export default function GroupList() {
    const dispatch = useDispatch();
    const params = useParams();
    const orgId = params.org_id ?? "";
    const [groups, setGroups] = useState<IGroup[]>([]);
    const selectedGroupId = useSelector((state: State) => state.interaction.org.main.selectedGroupId, isEqual);

    useEffect(() => {
        api.get(`/orgs/${orgId}/groups`)
            .then((d) => {
                const groups = statusHandler<IGroup[]>(d);
                setGroups(groups);
            })
            .catch((e) => {
                console.error(e);
                setGroups([]);
            });
    }, []);

    function select(groupId: string) {
        if (selectedGroupId == groupId) {
            groupId = "";
        }
        dispatch({
            type: COMP_INTERACTION_SELECT_DEVICE,
            data: {
                deviceId: "",
            },
        });
        dispatch({
            type: COMP_INTERACTION_SELECT_GROUP,
            data: {
                groupId: groupId,
            },
        });
    }
    return (
        <Wrapper>
            <GridRow0>
                <Header>{GroupIcon} 그룹</Header>
                <Header>{groups.length}</Header>
            </GridRow0>
            <GridRow1>
                {groups.map((group) => {
                    let bgColor = "white";
                    if (group.id == selectedGroupId) {
                        bgColor = config.style["list-item-hover-color"];
                    }
                    return (
                        <>
                            <Item
                                key={Math.random()}
                                onClick={() => {
                                    select(group.id);
                                }}
                                bgColor={bgColor}
                            >
                                {group.name}
                            </Item>
                        </>
                    );
                })}
            </GridRow1>
        </Wrapper>
    );
}
