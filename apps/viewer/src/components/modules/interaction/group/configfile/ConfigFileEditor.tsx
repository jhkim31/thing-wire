

import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IConfigFile from 'shared/interface/configfile/IConfigFile';
import State from 'shared/interface/viewer/State';
import { styled } from 'styled-components';

import api from '@api';
import { statusHandler } from '@lib/axios';
import IGroup from 'shared/interface/group/IGroup';
import { COMP_INTERACTION_GROUP_SELECT_FILEID } from '@redux/Action';
import { v4 as uuid } from 'uuid';

const ConfigGroupAlert = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 160px 1fr 80px ;
    padding: 30px;
`;

const Header = styled.div`    
`

const Editor = styled.textarea`    
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
    resize: none;    
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: flex-end;    
`

export default function ConfigFileEditor() {
    const params = useParams();
    const orgId = params.org_id as string;
    const groupId = params.group_id as string;
    const dispatch = useDispatch();

    const [state, setState] = useState(0);
    const selectedFileId = useSelector((state: State) => state.interaction.group.configfile.fileId);
    const [selectedConfigFile, setSelectedConfigFile] = useState<IConfigFile>();

    const [comment, setComment] = useState("");
    const [data, setData] = useState("");       //0 : view,  1 : edit,  2 : new file
    const [fileName, setFileName] = useState("");
    const [isConfigGroup, setIsConfigGroup] = useState(false);

    const SelectBox = useRef<HTMLSelectElement | null>(null);

    function editFile() {
        setState(1);
        setComment("");
        setFileName(selectedConfigFile?.name ?? "");
        setData(selectedConfigFile?.data ?? "");
    }

    function newFile() {
        setState(2);
        setFileName("");
        setComment("");
        setData("");
    }

    function postNewConfigFile() {
        const newFileId = uuid();

        const postConfigFileRequest = {
            id: newFileId,
            fileName: fileName,            
            fileData: data,
            comment: comment,
        }

        api.post(`/orgs/${orgId}/groups/${groupId}/configfiles/${newFileId}`, postConfigFileRequest)
            .then(d => {
                const configFile: IConfigFile = statusHandler<IConfigFile>(d);
                setState(0);
                dispatch({
                    type: COMP_INTERACTION_GROUP_SELECT_FILEID,
                    data: {
                        fileId: configFile.id
                    }
                });                                
            });
    }


    function turnConfigGroup() {
        api.post(`/orgs/${orgId}/groups/${groupId}/settings?configgroup=true`)
            .then(d => {
                statusHandler(d);
                setIsConfigGroup(true);
            })
    }

    useEffect(() => {
        setState(0);
        api.get(`/orgs/${orgId}/groups/${groupId}`)
            .then(d => {
                const group = statusHandler<IGroup>(d);

                if (group.configFile) {
                    dispatch({
                        type: COMP_INTERACTION_GROUP_SELECT_FILEID,
                        data: { fileId: group.configFile.id }
                    });
                    setIsConfigGroup(group.isConfigGroup);
                    setSelectedConfigFile(group.configFile);
                }
            })
    }, []);

    useEffect(() => {
        setState(0);
        api.get(`/orgs/${orgId}/groups/${groupId}/configfiles/${selectedFileId}`)
            .then(d => {
                const configFile = statusHandler<IConfigFile>(d);
                setSelectedConfigFile(configFile);
            })
    }, [selectedFileId]);


    if (isConfigGroup) {
        if (state === 0) {
            //view
            return <Wrapper>
                <Header>
                    <h3>View</h3>
                    {selectedConfigFile !== undefined && <div>파일이름 : {selectedConfigFile.name}</div>}
                    {selectedConfigFile !== undefined && <div>설명 : {selectedConfigFile.comment}</div>}
                    {selectedConfigFile !== undefined && <div>업데이트 : {selectedConfigFile.updatedAt}</div>}
                    {selectedConfigFile?.modifier !== undefined && <div>수정자 : {selectedConfigFile.modifier.name}</div>}
                </Header>
                <Editor readOnly={true} value={selectedConfigFile?.data ?? ""} />
                <Footer>
                    {selectedConfigFile !== undefined && <button onClick={editFile}>수정</button>}
                    <button onClick={newFile}>새 파일</button>
                </Footer>
            </Wrapper>
        } else if (state === 1) {
            // edit
            return <Wrapper>
                <Header>
                    <h3>Edit</h3>
                    <div>파일이름 : <input size={70} value={fileName} onChange={(e) => setFileName(e.target.value)} /></div>
                    <div>설명 : <input size={70} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={selectedConfigFile?.comment} /></div>
                </Header>
                <Editor
                    onChange={(e => {
                        setData(e.target.value);
                    })}
                    value={data}
                    onKeyDown={e => {
                        if ((e.metaKey || e.ctrlKey) && (e.key == "s" || e.key == "S")) {
                            e.preventDefault();
                            SelectBox.current?.focus();
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault(); // 기본 동작(탭 이동) 중지

                            const start = e.currentTarget.selectionStart;
                            const end = e.currentTarget.selectionEnd;

                            // 현재 커서 위치를 찾아서 스페이스 2개를 삽입
                            const newText = data.substring(0, start) + '  ' + data.substring(end);
                            e.currentTarget.value = newText;
                            setData(newText);

                            // 커서 위치 조정
                            const newCursorPos = start + 2;
                            e.currentTarget.setSelectionRange(newCursorPos, newCursorPos);
                        }
                    }}
                />
                <Footer>
                    <button onClick={postNewConfigFile} >변경 사항 저장</button>
                </Footer>
            </Wrapper>
        } else if (state === 2) {
            return <Wrapper>
                <Header>
                    <h3>New File</h3>
                    <div>파일이름 : <input size={70} value={fileName} onChange={(e) => setFileName(e.target.value)} /></div>
                    <div>설명 : <input size={70} value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                </Header>
                <Editor
                    onChange={(e => {
                        setData(e.target.value);
                    })}
                    value={data}
                    onKeyDown={e => {
                        if ((e.metaKey || e.ctrlKey) && (e.key == "s" || e.key == "S")) {
                            e.preventDefault();
                            SelectBox.current?.focus();
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const start = e.currentTarget.selectionStart;
                            const end = e.currentTarget.selectionEnd;

                            // 현재 커서 위치를 찾아서 스페이스 2개를 삽입
                            const newText = data.substring(0, start) + '  ' + data.substring(end);
                            e.currentTarget.value = newText;
                            setData(newText);

                            // 커서 위치 조정
                            const newCursorPos = start + 2;
                            e.currentTarget.setSelectionRange(newCursorPos, newCursorPos);
                        }
                    }}
                />
                <Footer>
                    <button onClick={postNewConfigFile}>새 파일 저장</button>
                </Footer>
            </Wrapper>
        } else {
            return <></>
        }
    } else {
        return <ConfigGroupAlert>
            <button onClick={turnConfigGroup}>Config Group으로 전환</button>
        </ConfigGroupAlert>
    }
}