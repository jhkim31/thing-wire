import {styled} from "styled-components";

const GridContainer = styled.div<{
    gridCN: number;
    gridRN: number;
}>`
    box-sizing: border-box;
    padding:10px;    
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${p => p.gridCN}, 1fr);
    grid-template-rows: repeat(${p => p.gridRN}, 1fr);
    gap: 10px;
`;

const GridItem = styled.div<{cspan: number, rspan: number}>`
    grid-column: auto / span ${p => p.cspan};
    grid-row: auto / span ${p => p.rspan};      
    min-width: 100px;
    min-height: 100px;
`;

const GridItemComponent = styled.div`
    width: 100%;
    height: 100%;    
    box-sizing: border-box;
    border: 1px solid #DEE1EF;
    border-radius: 10px;
    background: white;    
    overflow: hidden;    
`;

const AccessDenied = styled.div`
    display: flex;
    justify-content: center; /* 가로 방향 가운데 정렬 */
    align-items: center; 
    background: red;
    width: 100%;
    height: 100%;
    color: white;
`;

export {GridContainer, GridItemComponent , GridItem, AccessDenied};