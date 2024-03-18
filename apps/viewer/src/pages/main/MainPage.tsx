import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

export default function MainPage() {
    const main = useSelector((state: State) => state.components.main, isEqual);

    return (
        <DynamicLayout componentInfo={main}></DynamicLayout>
    );
};