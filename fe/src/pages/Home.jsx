import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LogoHeader from '@common/LogoHeader';
import TabBar from '@common/TabBar';

import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Icon from '@common/Icon';
import DONA_IMG from '@assets/donaImgEx.png';
import { ICON_NAME } from '@constants/iconName';
import { PATH } from '@constants/path';
import { TAB_NAME } from '@constants/tabName';

const Home = () => {
  const pointList = ['특정 장소\n방문하기', '기부 쇼핑몰\n리뷰 작성하기'];
  const donaList = [
    {
      id: 1,
      img: DONA_IMG,
      category: '자선단체',
      title: '세이브더칠드런 아동 식사지원캠페인',
      perAccomp: 75,
      moneyAccomp: 75000,
    },
    {
      id: 2,
      img: DONA_IMG,
      category: '개인',
      title: '보건위생물품이 필요합니다.',
      perAccomp: 30,
      moneyAccomp: 35000,
    },
    {
      id: 3,
      img: DONA_IMG,
      category: '개인',
      title: '보건위생물품이 필요합니다.',
      perAccomp: 5,
      moneyAccomp: 1000,
    },
  ];

  const navigate = useNavigate();

  const handleClick = (name) => {
    if (name === pointList[0]) {
      navigate(PATH.MAP);
    } else {
      navigate(PATH.REVIEW_HOME);
    }
  };

  const handleList = (id) => {
    console.log('Home');
    console.log(id);
    navigate(PATH.DONATION, { state: id });
  };

  return (
    <>
      <Container>
        <LogoHeader />
        {/* 포인트 획득 미션 */}
        <PointBox>
          <Title>포인트 획득 미션 💸</Title>
          <ButtonWrapper>
            {pointList.map((index) => {
              return (
                <Pbutton
                  onClick={(e) => {
                    handleClick(index);
                  }}
                >
                  <Subtitle>{index}</Subtitle>
                  <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.green500} width={20} height={20}></Icon>
                </Pbutton>
              );
            })}
          </ButtonWrapper>
        </PointBox>
        {/* 기부처 리스트 */}
        <DonaListBox>
          <Title>기부처 😎</Title>
          <ListWrapper>
            {donaList.map((item) => {
              return (
                <ListBtn
                  onClick={() => {
                    handleList(item.id);
                  }}
                >
                  <Img src={item.img} alt="Donation Img" />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      height: '90px',
                    }}
                  >
                    <CategoryT>{item.category}</CategoryT>
                    <DonaTitle>{item.title}</DonaTitle>
                    <div
                      style={{
                        marginBottom: '7px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <PerAccomp>{item.perAccomp}%</PerAccomp>
                      <MoneyAccomp>{item.moneyAccomp}원 달성</MoneyAccomp>
                    </div>
                    <div>
                      <Bar>
                        <ColorBar perAccomp={item.perAccomp}></ColorBar>
                      </Bar>
                    </div>
                  </div>
                </ListBtn>
              );
            })}
          </ListWrapper>
        </DonaListBox>
      </Container>
      <TabBar currentTab={TAB_NAME.HOME} />
    </>
  );
};

export default Home;

const Container = styled.div`
  background-color: ${COLOR.white};
  height: 100vh;
  overflow: auto;
`;

const PointBox = styled.div`
  margin-bottom: 9px;
  padding: 16px;
  height: 160px;
  background-color: ${COLOR.gray200};
`;

const Title = styled.p`
  ${FONT.title3}
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 8px 0 8px;
  justify-content: space-between;
  align-items: center;
`;

const Pbutton = styled.button`
  padding: 0 14px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 163px;
  height: 87px;
  border: none;
  border-radius: 20px;
  background-color: ${COLOR.white};
  white-space: pre-line;
`;

const Subtitle = styled.p`
  ${FONT.headline}
  text-align: left;
`;

const DonaListBox = styled.div`
  padding: 16px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ListBtn = styled.button`
  margin: 0 8px 0 8px;
  display: flex;
  align-items: center;
  height: 122px;
  background-color: transparent;
`;

const Img = styled.img`
  margin-right: 10px;
  width: 90px;
  height: 90px;
  overflow: hidden;
`;

const CategoryT = styled.p`
  ${FONT.caption2}
  color: ${COLOR.green700};
  margin-bottom: 3px;
`;

const DonaTitle = styled.p`
  ${FONT.subhead}
  font-weight: bold;
  width: 240px;
  text-align: left;
  margin-bottom: 9px;
`;

const PerAccomp = styled.p`
  ${FONT.footnote}
  font-weight: bold;
  color: ${COLOR.green700};
`;

const MoneyAccomp = styled.p`
  ${FONT.caption2}
`;

const Bar = styled.div`
  width: 242px;
  height: 11px;
  border-radius: 50px;
  background-color: ${COLOR.gray200};
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
`;

const ColorBar = styled.div`
  width: ${({ perAccomp }) => 242 * (perAccomp / 100)}px;
  height: 11px;
  border-radius: 50px 0 0 50px;
  background-color: ${COLOR.green500};
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
`;
