import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Dispatch } from 'redux';
import IUser from 'shared/interface/user/IUser';
import styled from 'styled-components';

import api from '@api';
import Header from '@components/default/Header';
import Sidebar from '@components/default/Sidebar';
import ErrorMsg from '@components/modules/ErrorMsg';
import * as axiosHandler from '@lib/axios';
import DynamicPage from '@pages/DynamicPage';
import MainOrgPageNew from '@pages/main/MainOrgPageNew';
import OrgGroupsPageNew from '@pages/org/OrgGroupsPageNew';
import { SET_COMPONENTS, SET_USER } from '@redux/Action';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px 1fr;
    height: 100%;
`

const Content = styled.div`
    background: $content-background;
    min-width: 800px;
    min-height: 600px;
    overflow: auto;
`

function App() {
    const [errMsg, setErrMsg] = useState<string>("");
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        setErrMsg("");
        api.get(`/auth`)
            .then((d) => {
                const user = axiosHandler.statusHandler<IUser>(d);
                dispatch({
                    type: SET_USER,
                    data: {
                        user: {
                            id: user.id,
                            name: user.name,
                            isSA: user.isSA
                        },
                    },
                });
            })
            .catch(e => axiosHandler.errorHandler(e, setErrMsg));

        api.get(`/config`)
            .then((d) => {
                axiosHandler.statusHandler(d);
                dispatch({
                    type: SET_COMPONENTS,
                    data: d.data.body,
                });

            })
            .catch(e => axiosHandler.errorHandler(e, setErrMsg));

    }, []);

    if (errMsg === "") {
        return (
            <Wrapper>
                <Header />
                <Sidebar />
                <Content>                                        
                    <Routes>                        
                        <Route path="/" element={<DynamicPage componentName={"main"} />} />
                        <Route path="/admin" element={<DynamicPage componentName={"admin"} />} />
                        <Route path="/devices/:device_id" element={<DynamicPage componentName={"device"} />} />
                        <Route path="/orgs" element={<DynamicPage componentName={"orgDetailListPage"} />} />
                        <Route path="/orgs/new" element={<MainOrgPageNew />} />
                        <Route path="/orgs/:org_id" element={<DynamicPage componentName={"organization"} />} />

                        <Route path="/orgs/:org_id/devices" element={<DynamicPage componentName={"orgDevicesPage"} />} />
                        <Route path="/orgs/:org_id/dashboard" element={<DynamicPage componentName={"orgDashboardPage"} />} />
                        <Route path="/orgs/:org_id/groups" element={<DynamicPage componentName={"orgGroupDetailListPage"} />} />
                        <Route path="/orgs/:org_id/groups/new" element={<OrgGroupsPageNew />} />

                        <Route path="/orgs/:org_id/configfiles" element={<DynamicPage componentName={"orgConfigFilePage"} />} />
                        <Route path="/orgs/:org_id/devices/:device_id" element={<DynamicPage componentName={"device"} />} />
                        <Route path="/orgs/:org_id/devices/:device_id/configfiles" element={<DynamicPage componentName={"deviceConfigFilePage"} />} />

                        <Route path="/orgs/:org_id/groups/:group_id" element={<DynamicPage componentName={"group"} />} />
                        <Route path="/orgs/:org_id/groups/:group_id/configfiles" element={<DynamicPage componentName={"groupConfigFilePage"} />} />

                        <Route path="/orgs/:org_id/groups/:group_id/devices/:device_id" element={<DynamicPage componentName={"device"} />} />
                        <Route path="/orgs/:org_id/groups/:group_id/devices/:device_id/configfiles" element={<DynamicPage componentName={"deviceConfigFilePage"} />} />
                        <Route path="*" element={<div>비정상적인 접근경로</div>} />
                    </Routes>
                </Content>
            </Wrapper>
        );
    } else {
        return (<ErrorMsg errMsg={errMsg} />)
    }
}

export default App;
