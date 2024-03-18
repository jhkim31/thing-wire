import { lazy, Suspense } from "react";

import { GridItem, GridContainer, GridItemComponent } from "./Layout";
import loadComponent from "./loadComponent";
import { ComponentInfo } from "shared/interface/viewer/State";

const DynamicLayout = (props: { componentInfo: ComponentInfo }) => {
    const componentInfo = props.componentInfo;
    if (componentInfo) {
        return (
            <GridContainer gridCN={componentInfo.col} gridRN={componentInfo.row}>
                {componentInfo.components.map((component: { componentName: string; colSpan?: number; rowSpan?: number }) => {
                    const colSpan = component.colSpan ?? 1;
                    const rowSpan = component.rowSpan ?? 1;

                    const LazyComponent = lazy(async () => {
                        return await loadComponent(component.componentName);
                    });
                    return (
                        <GridItem cspan={colSpan} rspan={rowSpan} key={Math.random()}>
                            <GridItemComponent>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <LazyComponent />
                                </Suspense>
                            </GridItemComponent>
                        </GridItem>
                    );
                })}
            </GridContainer>
        );
    } else {
        return <>로딩중</>;
    }
};

export default DynamicLayout;
