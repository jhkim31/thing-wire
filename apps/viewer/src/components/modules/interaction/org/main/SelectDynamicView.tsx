import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import State from "shared/interface/viewer/State";
import styled from "styled-components";
import api from "@api";
import IDevice from "shared/interface/device/IDevice";
import { statusHandler } from "@lib/axios";
import { COMP_INTERACTION_SELECT_VIEW } from "@redux/Action";
import config from "@config";
import { isEqual } from "lodash";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;    
    justify-content: space-around;
    padding: 20px;
`
/**
 * * color1 : 기본 버튼 글자색, 테두리색 (선택 버튼 배경색)
 * * color2 : 기본 버튼 배경색, (선택 버튼 글자색)
 */
const ViewButton = styled.div<{ color1: string; color2: string;}>`
    flex: auto;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: ${p => p.color1};    
    border: 1px solid ${p => p.color1};
    background: ${p => p.color2};
    border-radius: 10px;

    &:hover{
        background: ${config.style["main-theme-color"]};
        color: white;
    }
`

export default function SelectDynamicViewModule() {    
    const params = useParams();
    const dispatch = useDispatch();
    const [deviceType, setDeviceType] = useState(0);
    const selectedOrgId = params.org_id;

    const selectedViewName = useSelector((state: State) => state.interaction.org.main.selectedViewName, isEqual);
    const selectedGroupId = useSelector((state: State) => state.interaction.org.main.selectedGroupId, isEqual);
    const selectedDeviceId = useSelector((state: State) => state.interaction.org.main.selectedDeviceId, isEqual);

    function selectView(viewName: string) {
        dispatch({
            type: COMP_INTERACTION_SELECT_VIEW,
            data: {
                view: viewName,
            }
        });
    }

    const typeViews = [
        [],
        [
            {
                label: "상태정보",
                name: "DeviceSystemData"
            },
            {
                label: "Config File",
                name: "ConfigFileView"
            },
            {
                label: "차트",
                name: "DeviceDataChart_Interaction"
            },
            {
                label: "터미널",
                name: "Terminal_Interaction"
            },
        ],
        []
    ]


    useEffect(() => {
        if (selectedDeviceId !== "") {
            api.get(`/orgs/${selectedOrgId}/groups/${selectedGroupId}/devices/${selectedDeviceId}`)
                .then(d => {
                    const device: IDevice = statusHandler<IDevice>(d);
                    setDeviceType(device.type);
                    selectView(typeViews[device.type][0].name);
                })
                .catch(e => {
                    console.error(e);
                })
        } else {
            setDeviceType(0);
            selectView("");
        }
    }, [selectedDeviceId]);

    if (deviceType === 1) {
        return (
            <Wrapper>
                {typeViews[deviceType].map(view => {
                    let c1 = config.style["main-theme-color"];
                    let c2 = "white";

                    if (view.name == selectedViewName){
                        c1 = "white";
                        c2 = config.style["main-theme-color"];
                    }
                    return <ViewButton 
                        key={Math.random()} 
                        onClick={e => selectView(view.name)}
                        color1={c1}
                        color2={c2}                        
                        >
                            {view.label}
                    </ViewButton>
                })}
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
            </Wrapper>
        )
    }
}