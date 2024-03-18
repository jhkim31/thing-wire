import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';
import { isEqual } from 'lodash';

const DevicePage = () => {
    const device = useSelector((state: State) => state.components.device, isEqual);
    return (
        <DynamicLayout componentInfo={device}></DynamicLayout>
    );
};

export default DevicePage;
