import { useState } from 'react';
import { styled } from 'styled-components';

import { CheckedSquareIcon, DashSquareIcon, SearchIcon, SquareIcon } from '@components/icons';
import DashboardBtn from '@components/modules/shared/DashboardBtn';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
`;

const NavBar = styled.div`
    height: 50px;
`;

const TableContent = styled.div`
    flex: 1 1 0;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    text-align: left;
    border-spacing: 0;
`;

const TableHead = styled.thead`
    position: sticky;
    top: 0;
    background: #f2f4f9;
`;

const TableHeader = styled.th`
    text-wrap: nowrap;
    padding: 15px 20px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ bg_color?: string; }>`
    font-size: 0.9em;
    &:hover {
        td {
            background: #eaf5fb;
        }
    }
    td {
        background: ${(p) => p.bg_color};
    }
`;

const TableData = styled.td`
    min-width: 150px;
    text-wrap: nowrap;
    padding: 15px 20px;
`;

const CheckBox = styled.td`
    padding: 0 20px;    
`;

const SearchBox = styled.input`
    width: 500px;
    height: 30px;
    font-size: 17px;
    border: 0;
    border-bottom: 1px solid #ebedf6;
    margin-left: 20px;
`;

interface props {    
    selectable: boolean;
    tableHeader: string[];
    tableBody: { [key: string]: string }[];    
    defaultSortKey?: string;
    custonBtn?: { name: string; clickFunc?: Function; color?: string }[];
    rowClickFunc?: Function;
    selectedRowIds?: Set<string>;
    setSelectedRowIds?: Function;
    showIdColumn?: boolean;
    allSelectFunc?: Function;
}

const DataTable = (props: props) => {
    const selectable = props.selectable;
    const tableHeader = props.tableHeader;
    const tableBody = props.tableBody;
    const customBtn = props.custonBtn;
    const showIdColumn = props.showIdColumn ?? true;
    const rowClickFunc = props.rowClickFunc;
    const selectedRowIds = props.selectedRowIds ?? new Set([]);
    const setSelectedRowIds = props.setSelectedRowIds;
    const allSelectFunc = props.allSelectFunc;

    const [filter, setFilter] = useState("");
    const [sortKey, setSortKey] = useState(props.defaultSortKey ?? "");
    const [sortOrder, setSortOrder] = useState(-1);

    function sortTable(sk: string) {
        let newSortOrder = sortOrder;
        if (sortKey == sk) {
            newSortOrder *= -1;
        }
        setSortKey(sk);
        setSortOrder(newSortOrder);
        tableBody.sort((a, b) => {
            if (a[sk] == undefined) {
                return -1 * newSortOrder;
            }
            if (b[sk] == undefined) {
                return 1 * newSortOrder;
            }
            if (!isNaN(Number(a[sk])) && !isNaN(Number(b[sk]))) {
                if (parseFloat(a[sk]) > parseFloat(b[sk])) {
                    return 1 * newSortOrder;
                } else if (parseFloat(a[sk]) < parseFloat(b[sk])) {
                    return -1 * newSortOrder;
                } else {
                    return 0 * newSortOrder;
                }
            } else {
                if (a[sk] > b[sk]) {
                    return 1 * newSortOrder;
                } else if (a[sk] < b[sk]) {
                    return -1 * newSortOrder;
                } else {
                    return 0 * newSortOrder;
                }                
            }
        });
    }

    return (
        <Wrapper>
            <NavBar>
                {customBtn?.map((btnConfig) => {
                    return <DashboardBtn value={btnConfig.name} onClick={btnConfig.clickFunc} color={btnConfig.color} />;
                })}
                {SearchIcon}
                <SearchBox
                    placeholder={"Search entries..."}
                    type="input"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                />
            </NavBar>
            <TableContent>
                <Table>
                    <TableHead>
                        <TableRow bg_color={"#F2F4F9"}>
                            {selectable && tableHeader.length > 0 && <TableHeader onClick={() => allSelectFunc?.()}>{selectedRowIds.size == 0 ? SquareIcon : selectedRowIds.size == tableBody.length ? CheckedSquareIcon : DashSquareIcon}</TableHeader>}
                            {tableHeader.map((column: string) => {
                                if (column == 'id' && !showIdColumn){
                                    return null;                                    
                                }
                                return (
                                    <TableHeader onClick={() => sortTable(column)} key={Math.random()}>
                                        {sortKey != column ? column : sortOrder == 1 ? <strong>{column} ↑ </strong> : sortOrder == -1 ? <strong>{column} ↓ </strong> : ""}
                                    </TableHeader>
                                );                             
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody.map((row: { [key: string]: string }, ind: number) => {
                            let matchData = false;
                            for (const value of Object.values(row)) {
                                if (value.includes(filter)) {
                                    matchData = true;
                                }
                            }
                            if (!matchData) {
                                return null;
                            }
                            let bgColor = "white";
                            if (ind % 2 != 0) {
                                bgColor = "#f7f7fd";
                                
                            }
                            return (
                                <TableRow bg_color={bgColor} key={Math.random()}>
                                    {selectable && <CheckBox onClick={() => {setSelectedRowIds?.(row['id'])}}>{selectedRowIds.has(row['id']) ? CheckedSquareIcon : SquareIcon}</CheckBox>}                                    
                                    {tableHeader.map((column: string) => {
                                        if (column == 'id' && !showIdColumn){
                                            return null;
                                        }
                                        return <TableData key={Math.random()} onClick={() => {rowClickFunc?.(row['id'], row['name'])}}>{row[column] ?? "-"}</TableData>;                                                                                                                           
                                    })}                                    
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContent>
        </Wrapper>
    );
};

export default DataTable;