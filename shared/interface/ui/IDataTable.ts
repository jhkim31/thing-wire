/**
 * React Table 에 사용되는 Interface
 * 
 * * tableHeader : 헤더행을 이루며, 문자열배열임.
 * * tableBody : 열의 이름을 key 가지고, 해당 열의 값을 value로 가지는 object 배열
```typescript
interface IDataTable {
    tableHeader: string[];
    tableBody: {
        [key: string]: string;
    }[]
}
```
 */
export default interface IDataTable {
    tableHeader: string[];
    tableBody: {
        [key: string]: string;
    }[]
}