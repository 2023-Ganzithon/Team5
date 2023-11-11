import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { TAB_NAME } from '@constants/tabName';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import PointHistoryItem from '@components/PointHistoryItem';
import { AuthContext } from '@store/AuthContextProvider';

const PointHistory = () => {
  // * 연동되고 나서 profile은 context에 담긴 정보 사용
  const [profile, setProfile] = useState({
    nickname: null,
    points: null,
  });
  const [pointHistory, setPointHistory] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/myPage/mypoint', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { profile, park_points: parkPointHistory, mall_points: mallPointHistory } = data;
        const history = [...parkPointHistory, ...mallPointHistory];
        const { nickname, points } = profile;

        setPointHistory(history);
        setProfile({ nickname, points });
      });
  }, []);

  // ? 현재 유저가 가지고 있는 포인트 데이터 못찾음
  return (
    <>
      <Layout>
        <Header title="포인트 적립 내역" backUrl={-1} />
        <Main>
          <CurrentPointInfo>
            <PointInfo>{profile.nickname}님이 현재 보유한 포인트는</PointInfo>
            <PointInfo>{profile.points ?? 0}p</PointInfo>
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
