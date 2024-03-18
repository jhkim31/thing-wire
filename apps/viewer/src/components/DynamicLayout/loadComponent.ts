import {ComponentType} from "react";

/**
 * modules 디렉토리를 기준으로 모듈(.tsx 컴포넌트) 를 lazy load 합니다.
 * @param componentName 
 * @returns 
 */
const loadComponent = async (componentName: string): Promise<{default: ComponentType}> => {
    try {
        const module = await import(`../modules/${componentName}`);
        return {default: module.default};
    } catch (error) {
        const module = await import(`../modules/DefaultComponent`);
        return {default: module.default};
    }
};

export default loadComponent;