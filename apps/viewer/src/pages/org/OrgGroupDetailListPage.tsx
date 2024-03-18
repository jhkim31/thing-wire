import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

const OrgGroupDetailListPage = () => {

    const orgGroupDetailListPage = useSelector((state: State) => state.components.orgGroupDetailListPage, isEqual);
    return (
        <DynamicLayout componentInfo={orgGroupDetailListPage}></DynamicLayout>
    );    
};

export default OrgGroupDetailListPage;
