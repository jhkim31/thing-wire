import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: red;
`
interface props {
    errMsg: string;
}

export default function ErrorMsg(props: props) {
    const errMsg = props.errMsg;

    return (
        <Wrapper><h1>{errMsg}</h1></Wrapper>
    )
}