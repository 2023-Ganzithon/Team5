import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '@common/Header';
import TabBar from '@common/TabBar';
import MARCHROHO_BASIC from '@assets/marcoroho_basic.png';
import MOVE_ARROW from '@assets/moveArrow.png';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import { PATH } from '@constants/path';
import { TAB_NAME } from '@constants/tabName';

const mallList = [
  {
    id: 1,
    img: MARCHROHO_BASIC,
    title: '마르코로호',
    desc: '할머니의 일상을 행복하게 할머니의 일상을 행복하게',
    url: 'https://m.marcoroho.com/',
  },
  {
    id: 2,
    img: MARCHROHO_BASIC,
    title: '마르코로호',
    desc: '할머니의 일상을 행복하게',
    url: 'https://m.marcoroho.com/',
  },
  {
    id: 3,
    img: MARCHROHO_BASIC,
    title: '마르코로호',
    desc: '할머니의 일상을 행복하게',
    url: 'https://m.marcoroho.com/',
  },
  {
    id: 4,
    img: MARCHROHO_BASIC,
    title: '마르코로호',
    desc: '할머니의 일상을 행복하게',
    url: 'https://m.marcoroho.com/',
  },
  {
    id: 5,
    img: MARCHROHO_BASIC,
    title: '마르코로호',
    desc: '할머니의 일상을 행복하게',
    url: 'https://m.marcoroho.com/',
  },
];

const MallList = () => {
  const handleClick = (path) => {
    window.location.href = path;
  };
  return (
    <>
      <Container>
        <Header title={'기부 쇼핑몰'} backUrl={PATH.REVIEW_HOME} />
        <Wrapper>
          <ListBox>
            {mallList.map((index) => {
              return (
                <MallContainer onClick={() => handleClick(index.url)}>
                  <div className="mallwrap">
                    <img src={index.img} alt={index.id} />
                    <div className="infowrap">
                      <p className="title">{index.title}</p>
                      <p className="desc">{index.desc}</p>
                      <div className="arrowWrap">
                        <img src={MOVE_ARROW} className="movearrow" />
                      </div>
                    </div>
                  </div>
                </MallContainer>
              );
            })}
          </ListBox>
        </Wrapper>
      </Container>
      <TabBar currentTab={TAB_NAME.REVIEW} />
    </>
  );
};

export default MallList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.white};
  overflow: auto;
  padding-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  flex-direction: column;
  width: 100%;
`;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 92.8%;
`;

const MallContainer = styled.button`
  width: 174px;
  height: 282px;
  margin-bottom: 10px;
  background-color: transparent;
  text-align: left;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 174px;
    height: 202px;
    overflow: hidden;
  }

  .mallwrap {
    display: flex;
    flex-direction: column;
  }

  .infowrap {
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

  .title {
    ${FONT.subhead}
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    ${FONT.caption2}
    margin-bottom: 6px;
    height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .arrowWrap {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  .movearrow {
    width: 40px;
    height: 7.66px;
  }
`;
