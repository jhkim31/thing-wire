import { useDispatch, useSelector } from 'react-redux';
import IDevice from 'shared/interface/device/IDevice';
import IGroup from 'shared/interface/group/IGroup';
import IOrganization from 'shared/interface/organization/IOrganization';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';

import { DeviceIcon, ReturnIcon, GroupIcon, HomeIcon, OrgIcon } from '@components/icons';
import config from '@config';
import { RESET_STATE, SELECT_DEVICE, SELECT_GROUP, SELECT_ORG } from '@redux/Action';
import { isEqual } from 'lodash';

const Wrapper = styled.div`
    background: ${config.style["main-theme-color"]};
    color: ${config.style["main-theme-font-color"]};
    padding-left: ${config.style.Sidebar["paddingLeft"]};
    font-size: ${config.style.Sidebar["fontSize"]};        
`;

const SidebarItemH2 = styled.a<{select: boolean;}>`            
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 1.4em;    
    ${p => p.select ? "color: white;" : ""}
    ${p => p.select ? "font-weight: 600;" : "font-weight: 450;"}

    &:hover {
        background: #325A78;
    }
`;

const SidebarItemH3 = styled.a<{select: boolean;}>`            
    height: 35px;
    display: flex;
    align-items: center;

    margin-left: 25px;
    font-size: 1.1em;
    font-weight: 400;
    ${p => p.select ? "background: white;" : ""}    
    ${p => p.select ? "color: #334F6C;" : ""}    
    &:hover {
        ${p => p.select ? "background: white;" : "background: #325A78;"}    
        ${p => p.select ? "color: #334F6C;" : ""}                    
    }
`;

const IconBox = styled.span`
    margin: 5px;
`

const LabelBox = styled.span`
    flex: 1;
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const Sidebar = () => {
    const keyword = new Set(["new"]);
    const dispatch = useDispatch();
    const org: IOrganization = useSelector((state: State) => state.org, isEqual);
    const group: IGroup = useSelector((state: State) => state.group, isEqual);
    const device: IDevice = useSelector((state: State) => state.device, isEqual);
    let url: string[] = window.location.pathname.split("/").slice(1);

    const sidebarItems: { icon: JSX.Element; label: string; href: string; clickFunc?: () => void; subItems: { label: string; href: string }[] }[] = [
        {
            icon: HomeIcon,
            label: `메인페이지`,
            href: "/",
            clickFunc: reset,
            subItems: [
                {
                    label: `조직`,
                    href: "/orgs",
                }
            ],
        },
    ];

    function reset() {
        dispatch({
            type: RESET_STATE,
        });
    }

    function selectOrg() {
        dispatch({
            type: SELECT_ORG,
            data: { org: org },
        });
    }

    function selectGroup() {
        dispatch({
            type: SELECT_GROUP,
            data: { group: group },
        });
    }

    function selectDevice() {
        dispatch({
            type: SELECT_DEVICE,
            data: { device: device },
        });
    }

    while (url.length > 0) {
        const subItem = url[0];
        console.log(subItem);
        url = url.slice(1);

        if (url.length > 0) {
            const id = url[0];
            if (!keyword.has(id)) {
                switch (subItem) {
                    case "orgs":
                        sidebarItems.push({
                            icon: OrgIcon,
                            label: "조직",
                            href: "/orgs",
                            subItems: [],
                        });
                        sidebarItems.push({
                            icon: ReturnIcon,
                            label: `${org.name}`,
                            clickFunc: selectOrg,
                            href: `/orgs/${org.id}`,
                            subItems: [
                                {
                                    href: `/orgs/${org.id}/dashboard`,
                                    label: `대시보드`
                                },
                                {
                                    href: `/orgs/${org.id}/groups`,
                                    label: `그룹`,
                                },
                                {
                                    href: `/orgs/${org.id}/devices`,
                                    label: `장치`,
                                }                                
                            ],
                        });
                        break;
                    case "groups":
                        sidebarItems.push({
                            icon: GroupIcon,
                            label: "그룹",
                            href: `/orgs/${org.id}/groups`,
                            subItems: [],
                        });
                        sidebarItems.push({
                            icon: ReturnIcon,
                            label: `${group.name}`,
                            clickFunc: selectGroup,
                            href: `/orgs/${org.id}/groups/${group.id}`,
                            subItems: [
                                {
                                    href: `/orgs/${org.id}/groups/${group.id}/configfiles`,
                                    label: `Config File`
                                },                                
                            ],
                        });
                        break;
                    case "devices":
                        const href_base = group.id !== "" && window.location.pathname.includes("groups") ? `/orgs/${org.id}/groups/${group.id}/devices` : `/orgs/${org.id}/devices`;
                        sidebarItems.push({
                            icon: DeviceIcon,
                            label: "장치",
                            href: href_base,
                            subItems: [],
                        });
                        sidebarItems.push({
                            icon: ReturnIcon,
                            label: `${device.name}`,
                            clickFunc: selectDevice,
                            href: `${href_base}/${device.id}`,
                            subItems: [                                
                                {
                                    href: `${href_base}/${device.id}/configfiles`,
                                    label: `Config File`
                                },
                            ],
                        });
                        break;
                }
            }
            url = url.slice(1);
        }
    }

    return (
        <Wrapper id="Sidebar">
            {sidebarItems.map((sidebarItem, idx) => {
                return (
                    <>
                        <SidebarItemH2 href={sidebarItem.href} onClick={sidebarItem.clickFunc} select={idx == sidebarItems.length - 1}>
                            <IconBox>{sidebarItem.icon}</IconBox> <LabelBox>{sidebarItem.label}</LabelBox>
                        </SidebarItemH2>
                        <>
                            {idx == sidebarItems.length - 1 &&
                                sidebarItem.subItems.map((subItem) => {
                                    const urlLastItem: string = window.location.pathname.split("/").slice(-1)[0];
                                    const sItem = subItem.href.split('/').slice(-1)[0];                                    
                                    return (
                                        <SidebarItemH3 href={subItem.href} select={urlLastItem == sItem}><LabelBox>{subItem.label}</LabelBox></SidebarItemH3>
                                    );
                                })}
                        </>
                    </>
                );
            })}
        </Wrapper>
    );
};

export default Sidebar;
