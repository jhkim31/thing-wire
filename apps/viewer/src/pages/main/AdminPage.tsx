import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';
import { isEqual } from 'lodash';

const AdminPage = () => {    
    const admin = useSelector((state: State) => state.components.admin, isEqual);
    return (
        <DynamicLayout componentInfo={admin}></DynamicLayout>
    );
};

export default AdminPage;
