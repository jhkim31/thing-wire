import loadComponent from "@components/DynamicLayout/loadComponent";
import { isEqual } from "lodash";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import State from "shared/interface/viewer/State";

export default function DynamicView() {
    const view = useSelector((state: State) => state.interaction.org.main.selectedViewName, isEqual);
    
    const LazyComponent = lazy(async () => {
        return await loadComponent(`interaction/org/main/dynamic/${view}`);
    });

    if (view) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        )
    } else {
        return <></>;
    }
    

}