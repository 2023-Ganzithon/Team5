import React from 'react';
import styled from 'styled-components';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoPseed2.svg'

const Modal = ({place, point, totalPoint, onClose})=>{

    return (<ModalContainer>
    <PlaceTitle >{place}</PlaceTitle>
    <LogoImage src={LOGO} alt="로고"/>
    <PointText >+ {point} P</PointText>
    <TotalPointText >현재 누적 포인트 : {totalPoint} P</TotalPointText>
    <ButtonWrapper onClick={onClose}>
    <ButtonText>닫기</ButtonText>
  </ButtonWrapper>
    </ModalContainer>);
}

export default Modal;

const ModalContainer = styled.div`
position: absolute;
top: 170px;
left:70px;
z-index: 30;
width: 255px;
height: auto;
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
const ButtonWrapper = styled.button`
z-index: 10;
width: 100px;
height: 35px;
border-radius: 50px;
background-color: ${COLOR.green500};
border: none;
box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.24);
cursor:pointer;
margin: 10px;
`; 

const ButtonText = styled.span`
${FONT.headline}
  color: ${COLOR.white};
`;