export default interface SimpleListItem<K> {
    id: string; 
    label1: string; 
    label2?: string;
    origin: K;
}