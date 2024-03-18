export default function dateToLocaleString(d: Date): string {
    return d.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: 'h23',
        timeZone: "Asia/Seoul"
    });
}