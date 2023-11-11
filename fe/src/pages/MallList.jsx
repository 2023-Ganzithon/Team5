import React from 'react';
import styled from 'styled-components';

import Header from '@common/Header';
import TabBar from '@common/TabBar';
import MOVE_ARROW from '@assets/moveArrow.png';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import { PATH } from '@constants/path';
import { TAB_NAME } from '@constants/tabName';
import { MALLNAME, MALL_DESC, MALL_SMALLIMG, MALLPATH } from '@constants/mall';

const MallList = () => {
  const handleClick = (path) => {
    window.location.href = path;
  };

  const mallName = Object.values(MALLNAME);
  const mallImg = Object.values(MALL_SMALLIMG);
  const mallDesc = Object.values(MALL_DESC);
  const mallPath = Object.values(MALLPATH);

  return (
    <>
      <Container>
        <Header title={'기부 쇼핑몰'} backUrl={PATH.REVIEW_HOME} />
        <Wrapper>
          <ListBox>
            {mallName.map((item, index) => {
              return (
                <MallContainer onClick={() => handleClick(mallPath[index])}>
                  <div className="mallwrap">
                    <img src={mallImg[index]} alt={index} />
                    <div className="infowrap">
                      <p className="title">{item}</p>
                      <p className="desc">{mallDesc[index]}</p>
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
    white-space: pre-line;
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
