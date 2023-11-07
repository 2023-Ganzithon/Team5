import React from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { TAB_NAME } from '@constants/tabName';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import PointHistoryItem from '@components/PointHistoryItem';

const PointHistory = () => {
  return (
    <>
      <Layout>
        <Header title="포인트 적립 내역" backUrl={-1} />
        <Main>
          <CurrentPointInfo>
            <PointInfo>name님이 현재 보유한 포인트는</PointInfo>
            <PointInfo>600p</PointInfo>
          </CurrentPointInfo>
          <PointHistoryList>
            <PointHistoryItem type={'map'} point={10} text={'멋사 공원'} createdAt={new Date()} />
            <PointHistoryItem type={'review'} point={10} text={'마르코로호 리뷰'} createdAt={new Date()} />
            <PointHistoryItem type={'map'} point={10} text={'멋사 공원'} createdAt={new Date()} />
            <PointHistoryItem type={'review'} point={10} text={'마르코로호 리뷰'} createdAt={new Date()} />
            <PointHistoryItem type={'map'} point={10} text={'멋사 공원'} createdAt={new Date()} />
            <PointHistoryItem type={'review'} point={10} text={'마르코로호 리뷰'} createdAt={new Date()} />
            <PointHistoryItem type={'map'} point={10} text={'멋사 공원'} createdAt={new Date()} />
            <PointHistoryItem type={'review'} point={10} text={'마르코로호 리뷰'} createdAt={new Date()} />
          </PointHistoryList>
        </Main>
      </Layout>
      <TabBar currentTab={TAB_NAME.MY_PAGE} />
    </>
  );
};

export default PointHistory;

const Layout = styled.div`
  min-height: calc(100vh - 84px);
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
`;

const CurrentPointInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 12px;
  border-radius: 16px;
  background-color: ${COLOR.green50};
`;

const PointInfo = styled.span`
  color: ${COLOR.green800};
  ${FONT.title3}
`;

const PointHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
