import React from 'react';
import styled from 'styled-components';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoPseed2.svg'

const Modal = ({place, point, totalPoint})=>{

    return (<ModalContainer>
    <PlaceTitle >{place}</PlaceTitle>
    <LogoImage src={LOGO} alt="로고"/>
    <PointText >+ {point} P</PointText>
    <TotalPointText >현재 누적 포인트 : {totalPoint} P</TotalPointText>
        </ModalContainer>);
}

export default Modal;

const ModalContainer = styled.div`
width: 255px;
height: 325px;
flex-shrink: 0;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border-radius: 45px;
border: 2px solid ${COLOR.gray400};
background: ${COLOR.green50};
p{
    margin : 10px 0;
}
`

const PlaceTitle = styled.p`
${FONT.title1}
`;

const LogoImage = styled.img`
width: 100px;
height: 150px;
`;

const PointText = styled.p`
${FONT.title2}
`;

const TotalPointText = styled.p`
${FONT.subhead}
`;