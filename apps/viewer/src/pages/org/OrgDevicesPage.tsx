import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

const OrgDevicesPage = () => {
    const orgDevicesPage = useSelector((state: State) => state.components.orgDevicesPage, isEqual);
    return (
        <DynamicLayout componentInfo={orgDevicesPage}></DynamicLayout>
    );
};

export default OrgDevicesPage;
