import '@styles/modules/DeviceTerminal.scss';

import { useState } from 'react';
import { styled } from 'styled-components';
import { v4 as uuid } from 'uuid';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const Wrapper1 = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    background: black;
    padding: 10px;
`

const TerminalView2 = styled.div`
    width: 100%;
    height: 100%;
`

const Blind = styled.div`
    position: absolute;
    background: black;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function TerminalView(props: {deviceId: string;}) {
    const deviceId = props.deviceId;
    const [isConnect, setIsConnect] = useState<Boolean>(false);
    let resizeTimer: NodeJS.Timeout | null;
    function sshConnect() {
        setIsConnect(true);
        const terminalDiv: HTMLElement = document.getElementById(
            "terminal"
        ) as HTMLElement;

        const terminal = new Terminal();
        const fitAddon = new FitAddon();

        terminalDiv.innerHTML = "";

        terminal.loadAddon(fitAddon);
        terminal.open(terminalDiv);
        fitAddon.fit();

        var ws = new WebSocket(`ws://127.0.0.1:8888/ssh/${uuid()}/browser?width=${terminal.cols}&height=${terminal.rows}`);
        terminal.onKey((e) => {
            ws.send(e.key);
        });

        ws.onerror = function(evt) {
            console.log(evt);
        }

        ws.onmessage = function (evt) {
            terminal.write(evt.data);
        };

        ws.onclose = function (evt) {
            setIsConnect(false);
        };
        
        window.addEventListener('resize', e => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(() => {
                fitAddon.fit();
                ws.send(JSON.stringify({ key: "706b7d12-417c-47c7-b6b2-9a26545c916e", deviceId: deviceId, width: terminal.cols, height: terminal.rows }))                
            }, 500);
        })
    }

    return (
        <Wrapper1>
            {!isConnect && (
                <Blind>
                    <button onClick={() => sshConnect()}>ssh 연결</button>
                </Blind>
            )}
            <TerminalView2 id="terminal"></TerminalView2>
        </Wrapper1>
    );
}

export default TerminalView;
