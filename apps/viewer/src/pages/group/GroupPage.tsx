import { useSelector } from "react-redux";
import State from "shared/interface/viewer/State";
import DynamicLayout from "@components/DynamicLayout/DynamicLayout";
import { isEqual } from "lodash";

const GroupPage = () => {
    const group = useSelector((state: State) => state.components.group, isEqual);    
    return (        
        <DynamicLayout componentInfo={group}></DynamicLayout>
    );
};

export default GroupPage;
