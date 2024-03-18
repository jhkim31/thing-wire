import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

export default function OrgConfigFilePage() {
    const orgConfigFilePage = useSelector((state: State) => state.components.orgConfigFilePage, isEqual);
    return (
        <DynamicLayout componentInfo={orgConfigFilePage}></DynamicLayout>
    );
};
