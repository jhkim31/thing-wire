# keti-cloud

## 1. usage
```
cd viewer
npm run build

cd ../
ts-node app.ts
```
# Sensor Manager (WebSocket)
## 1. Registration 

### client request
```json
{
    id: string,
    type: string
}
```

### server response
```json
{
    id: string,
    status: string,
    msg: string
}
```

## 2. ping-pong
WebSocket 유지를 위해 1분에 한번씩 핑퐁.

## 3. Preference

### command type
* uptime : 가동 시간
* sensor-config : config 파일 전체 결과
* ifconfig : ifconfig 명령어 결과
* disk : 사용 가능 디스크 공간(df -h)
* memory : 메모리 사용량 (free -h)
* ap-ssid : SSID
* mac : MAC 주소
* ip : wlan0 ip 주소

### server request

```json
{
    id: string,
    cmd: command type,
    options: {}
}
```

### client response
```json
{
    id: string
    value: {}
}
```

## 4. disconnect
연결이 끊어지면, 서버(Manager)는 클라이언트(sensor)를 찾을 수 없기 때문에, 클라이언트 단에서 재연결에 대한 책임을 져야함.