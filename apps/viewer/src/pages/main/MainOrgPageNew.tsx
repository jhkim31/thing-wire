import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import api from '@api';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainOrgPageNew = () => {
    const nameInput = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        nameInput.current?.focus();
    }, [])

    function detectEnter(e: React.KeyboardEvent<HTMLInputElement>) {    
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter") {            
            submit();
        }
    }

function submit() {
    api.post(`/orgs`, { name: title })
        .then(d => {
            window.location.replace(`/orgs`);
            console.log(d.status, d.data.status);
        })
}
return (
    <Wrapper>
        <div>
            <h1>New Organization</h1>
            <input placeholder="이름" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={detectEnter} ref={nameInput} />
            <button onClick={submit}>생성</button>
        </div>
    </Wrapper>
);
};

export default MainOrgPageNew;
