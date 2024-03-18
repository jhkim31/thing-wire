import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { styled } from "styled-components";

import State from "shared/interface/viewer/State";
import { RESET_STATE } from "@redux/Action";
import config from "@config";
import IUser from "shared/interface/user/IUser";
import { isEqual } from "lodash";
import { HambugerIcon, XIcon } from "@components/icons";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;      
    background: ${config.style["main-theme-color"]};
    color: ${config.style["main-theme-font-color"]};
    grid-column: auto / span 2;    
`

const TitleBox = styled.a`
    font-size: 2em;
    font-weight: 600;
    height: 100%;    
    display: flex;
    align-items: center;
    margin-left: 20px;
`

const UserBox = styled.div`
    font-size: 1.5em;
    font-weight: 500;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;
`

const ItemContainer = styled.div`
    background: white;
    width: 200px;
    font-size : 14px;
    border: 1px solid gray;
    position: absolute;
    top: 70px;
    right: 0px;
    color: black;
    z-index: 999;

`
const InfoItem = styled.a`
    display: block;
    padding: 5px;    
    &:hover {
        background: ${config.style["list-item-hover-color"]};
    }
`

const Header = () => {
    const user: IUser = useSelector((state: State) => state.user, isEqual);
    const [isOpen, toggleOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <TitleBox href="/" onClick={() => dispatch({ type: RESET_STATE })} >
                ThingWIRE
            </TitleBox>
            <UserBox
                onClick={() => {
                    toggleOpen((prev) => !prev);
                }}
                style={{ justifySelf: "end", cursor: "pointer" }}
            >
                {user.name} {isOpen ? XIcon : HambugerIcon}
                {isOpen && (
                    <ItemContainer>
                        <hr />
                        <InfoItem href={"/api/v1/auth/logout"}>설정</InfoItem>
                        <hr />
                        <InfoItem href={"/api/v1/auth/logout"}>로그아웃</InfoItem>
                        <hr />
                        {user.isSA && <InfoItem href={"/admin"}>관리자 페이지</InfoItem>}
                        {user.isSA && <hr />}
                    </ItemContainer>
                )}
            </UserBox>
        </Wrapper>
    );
};

export default Header;
