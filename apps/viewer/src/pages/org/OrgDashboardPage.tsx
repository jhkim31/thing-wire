import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

const OrgDashboardPage = () => {

    const orgDashboardPage = useSelector((state: State) => state.components.orgDashboardPage, isEqual);
    return (
        <DynamicLayout componentInfo={orgDashboardPage}></DynamicLayout>
    );    
};

export default OrgDashboardPage;
