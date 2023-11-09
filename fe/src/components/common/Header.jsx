import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

Header.propTypes = {
  title: PropTypes.oneOf(['기부처 등록하기', '기부 내역', '포인트 적립 내역', '상품리뷰 작성', '기부하기']).isRequired,
  backUrl: PropTypes.oneOf(['/reviewHome', '/myPage', '/']).isRequired,
};

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
