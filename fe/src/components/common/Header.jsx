import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Icon from './Icon';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const Header = ({title, backUrl})=>{
    const navigate = useNavigate();

    return (<HeadContainer>
        <Icon 
        name="leftArrow"
        iconColor={COLOR.green500}
        onClick={() => navigate(backUrl)}
        style={{
          position: 'absolute',
          left: '7px',
        }}/>
        <p>{title}</p>
        </HeadContainer>);
}

export default Header;

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
p{
    ${FONT.title2}
}
`
