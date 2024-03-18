import { styled } from 'styled-components';
import SimpleListItem from "shared/interface/viewer/SimpleListItem";
import DashboardBtn from '@components/modules/shared/DashboardBtn';
import config from '@config';

const Wrapper = styled.div<{layout: string;}>`
    display: grid;
    height: 100%;
    padding: 40px;
    grid-template-rows: ${p => p.layout};
`;

const GridRow0 = styled.div`
    display: flex;
    justify-content: space-between;    
`;
const GridRow1 = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const GridRow1Content = styled.div`
    overflow: auto;
    font-size: 0.9em;
`;

const GridRow2 = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const Header = styled.div`
    font-size: ${config.style.Dashboard["fontSize"]};
    color: ${config.style.Dashboard["color"]};    
`;

const Item = styled.a<{selected: boolean;}>`
    text-wrap: nowrap;
    font-size: 1.1em;    
    display: inline;
    background: ${p => p.selected ? config.style["list-item-hover-color"] : "white"};
    &:hover {
        background: ${config.style["list-item-hover-color"]};
    }
    display: flex;
    justify-content: space-between;
`

const Item_1 = styled.div`
`

const Item_2 = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 30px;
`

interface props<T> {
    /**
     * id : 각 행을 구분할 수 있는 identifier
     * label1 (required) : 행의 머리 라벨 
     * label2 (optional) : 행의 꼬리 라벨
     * 
     */
    items: SimpleListItem<T>[];     
    itemSelectFunc?: (t: T) => void; 
    icon: JSX.Element;
    header: string; 
    selectItemId?: string;
    itemBaseUrl?: string; 
    controlUrl?: string; 
    btnValue?: string; 
    showUpdated?: boolean;
}

export default function SimpleList<T>(props: props<T>) {

    const header = props.header;
    const icon = props.icon;
    const items: SimpleListItem<T>[] = props.items;
    const selectItemId = props.selectItemId ?? "";
    const itemBaseUrl = props.itemBaseUrl;
    const itemClickFunc = props.itemSelectFunc;
    const controlUrl = props.controlUrl;
    const BtnValue = props.btnValue;

    let layout = "60px 1fr 40px";
    if (!BtnValue) {
        layout = "60px 1fr 0px";
    }
    

    return (
        <Wrapper layout={layout}>
            <GridRow0>
                <Header>
                    {icon} {header}
                </Header>
                <Header>
                    <strong>{items.length ?? 0}</strong>
                </Header>
            </GridRow0>
            <GridRow1>
                <GridRow1Content>
                    {items.map((item: SimpleListItem<T>) => {
                        return (
                            <Item
                                key={item.id}
                                onClick={() => {
                                    itemClickFunc?.(item.origin);
                                }}
                                href={itemBaseUrl ? itemBaseUrl + item.id : itemBaseUrl}
                                selected={item.id === selectItemId}
                            >
                                <Item_1>{item.label1}</Item_1>
                                {item.label2 && <Item_2>{item.label2}</Item_2>}                 
                            </Item>
                        );
                    })}
                </GridRow1Content>
            </GridRow1>
            <GridRow2>
                {BtnValue && controlUrl && <DashboardBtn onClick={() => (window.location.href = controlUrl)} value={BtnValue}></DashboardBtn>}                
            </GridRow2>
        </Wrapper>
    );
};
