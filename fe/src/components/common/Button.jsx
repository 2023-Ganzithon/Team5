import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { PATH } from '@constants/path';

const Button = ({ text, path, eventName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (eventName) {
      eventName();
    }

    if (path) {
      if (/^https:/.test(path)) {
        window.location.href = path;
      } else {
        navigate(path);
      }
    }
  };

  return (
    <>
      <ButtonWrapper onClick={handleClick} text={text}>
        <ButtonText text={text}>{text}</ButtonText>
      </ButtonWrapper>
    </>
  );
};

export default Button;

Button.propTypes = {
    text: PropTypes.oneOf(["리뷰 작성하기", "쇼핑몰로 이동하기", "홈 화면으로", "기부처 등록하기", "등록하기", "회원가입", "로그인", "기부"]).isRequired,
    path: PropTypes.string,
    eventName: PropTypes.string,
};

const ButtonWrapper = styled.button`
  width: 60%;
  height: 45px;
  border-radius: 50px;

    background-color: ${({ text }) => (text === "홈 화면으로" ? COLOR.white : COLOR.green500)};
    border: ${({ text }) => (text === "홈 화면으로" ? `1px solid ${COLOR.gray300}`  : 'none')};
    box-shadow: ${({ text }) => (
        text === "홈 화면으로" 
            ? "none"
            : "0px 1px 7px rgba(0, 0, 0, 0.24)"
    )};
`; 



const ButtonText = styled.span`
  ${({ text }) => (text === '홈 화면으로' ? FONT.body : FONT.headline)};
  color: ${({ text }) => (text === '홈 화면으로' ? COLOR.black : COLOR.white)};
`;
