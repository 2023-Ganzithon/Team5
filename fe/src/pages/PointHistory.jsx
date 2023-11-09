import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { TAB_NAME } from '@constants/tabName';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import PointHistoryItem from '@components/PointHistoryItem';

const PointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
    fetch('/myPage/myPoint')
      .then((res) => res.json())
      .then((data) => {
        const { park_points: parkPointHistory, mall_points: mallPointHistory } = data;
        const history = [...parkPointHistory, ...mallPointHistory];

        history.sort((a, b) => {
          const dateA = new Date(a.pointActivityDate);
          const dateB = new Date(b.pointActivityDate);

          return dateB - dateA;
        });

        setPointHistory(history);
      });
  }, []);

  // ? 현재 유저가 가지고 있는 포인트 데이터 못찾음
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
            {pointHistory.map(({ park, mall, pointActivityDate, earnedPoint }) => {
              return (
                <PointHistoryItem
                  key={pointActivityDate}
                  park={park}
                  mall={mall}
                  point={earnedPoint}
                  createdAt={new Date(pointActivityDate)}
                />
              );
            })}
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
