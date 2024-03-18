import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

const OrgPage = () => {
    const organization = useSelector((state: State) => state.components.organization, isEqual);
    return (
        <DynamicLayout componentInfo={organization}></DynamicLayout>
    );
};

export default OrgPage;
