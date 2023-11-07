import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoText.png'

const LogoHeader = ({title, backUrl})=>{
    const navigate = useNavigate();

    return (<HeadContainer>
        <img src={LOGO}/>
        </HeadContainer>);
}

export default LogoHeader;

const HeadContainer = styled.div`
position: sticky;
top: 0;
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
height: 55px;
background-color: ${COLOR.white};
border-bottom: 7px solid ${COLOR.gray200};
img{
    width:100px;
}
`
