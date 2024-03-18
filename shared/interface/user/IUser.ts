/**
 * User 인터페이스
 * 
 * * isSA : SuperUser 여부
```typescript
interface IUser {
    name: string;
    id: string;
    isSA?: boolean;
}
```
 */
export default interface IUser {
    name: string;
    id: string;
    isSA?: boolean;
}