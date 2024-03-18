import styled from 'styled-components';

import config from '@config';

const Btn_Style = styled.button<{color: string; color2: string;}>`
    min-width: ${config.style.DashboardButton["width"]};
    height: ${config.style.DashboardButton["height"]};
    border-radius: ${config.style.DashboardButton["borderRadius"]};
    font-size: ${config.style.DashboardButton["fontSize"]};
    user-select: ${config.style.DashboardButton["userSelect"]};
    position: ${config.style.DashboardButton["position"]};    
    display: ${config.style.DashboardButton["display"]};    
    font-family: ${config.style.DashboardButton["fontFamily"]};
    text-decoration: ${config.style.DashboardButton["textDecoration"]};
    font-weight: ${config.style.DashboardButton["fontWeight"]};
    transition: ${config.style.DashboardButton["transition"]};
    border: 1px solid ${p => p.color};
    color: ${p => p.color};
    background-color: ${p => p.color2};        
    padding: 0 20px;
    &:hover{
        background-color: ${p => p.color};
        color: ${p => p.color2};
    }
`
interface BtnProps {
    value?: string;
    onClick?: any;
    href?: string;    
    color?: string;
    color2?: string;
}

const DashboardBtn = (props: BtnProps) => {    
    const onClick = props.onClick ?? undefined;
    const value:string = props.value ?? '';
    const color = props.color ?? "#4EABE9";
    const color2 = props.color2 ?? "white";
    return (
        <Btn_Style
            onClick={onClick}
            color={color}
            color2={color2}
        >{value}</Btn_Style>
    );
};

export default DashboardBtn;
