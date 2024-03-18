import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@api';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const OrgGroupsPageNew = () => {    
    const nameInput = useRef<HTMLInputElement | null>(null);
    const params = useParams();
    const orgId = params.org_id ?? "";
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
        api.post(`/orgs/${orgId}/groups`, { name: title, orgId: orgId })
            .then(d => {
                window.location.replace(`/orgs/${orgId}/groups`);
                console.log(d.status, d.data.status);
            })
    }
    return (
        <Wrapper>
            <div>
                <h1>New Group</h1>
                <input placeholder="이름" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={(e) => detectEnter(e)} ref={nameInput} />
                <button onClick={submit}>생성</button>
            </div>
        </Wrapper>
    );
};

export default OrgGroupsPageNew;
