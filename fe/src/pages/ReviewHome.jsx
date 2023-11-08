import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoHeader from '@common/LogoHeader';
import TabBar from '@common/TabBar';
import AdSlider from '@components/AdSlider';

import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Icon from '@common/Icon';
import MARCOROHO from '@assets/marcoroho.png';
import { ICON_NAME } from '@constants/iconName';
import { PATH } from '@constants/path';
import { TAB_NAME } from '@constants/tabName';
import Button from '@common/Button';
import { BUTTON_NAME } from '@constants/buttonName';

const ReviewHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <LogoHeader />
        <AdSlider />
        <ListAll>
          <P>기부 쇼핑몰 전체 보러 가기</P>
          <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.black} width={12} height={12}></Icon>
        </ListAll>
        <PBox>
          <Subtitle>
            리뷰 작성하고 <span style={{ color: '#52B788' }}>포인트</span> 받자
          </Subtitle>
          <Button text={BUTTON_NAME.REVIEW_WRITE} path={PATH.REVIEW_WRITE} />
        </PBox>
      </Container>
      <TabBar currentTab={TAB_NAME.REVIEW} />
    </>
  );
};

export default ReviewHome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

const ListAll = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: ${COLOR.gray100};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
`;

const P = styled.p`
  ${FONT.footnote}
  margin-right: 16px;
`;

const PBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 170px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
`;

const Subtitle = styled.p`
  ${FONT.title2}
  margin-bottom: 16px;
`;
