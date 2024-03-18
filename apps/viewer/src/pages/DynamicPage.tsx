import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';
import State from 'shared/interface/viewer/State';

import DynamicLayout from '@components/DynamicLayout/DynamicLayout';

export default function DynamicPage (props: {componentName: string;}) {
    const component = props.componentName;
    const componentInfo = useSelector((state: State) => state.components[component], isEqual);
    return (
        <DynamicLayout componentInfo={componentInfo}></DynamicLayout>
    );
};