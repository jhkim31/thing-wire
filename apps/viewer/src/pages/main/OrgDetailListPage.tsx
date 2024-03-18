import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

const OrgDetailPage = () => {

    const orgDetailListPage = useSelector((state: State) => state.components.orgDetailListPage, isEqual);
    return (
        <DynamicLayout componentInfo={orgDetailListPage}></DynamicLayout>
    );    
};

export default OrgDetailPage;
