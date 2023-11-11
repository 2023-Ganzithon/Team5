import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { ICON_NAME } from '@constants/iconName';
import { TAB_NAME } from '@constants/tabName';
import Icon from '@common/Icon';
import Button from '@common/Button';
import TabBar from '@common/TabBar';
import DonationHistoryItem from '@components/DonationHistoryItem';
import PointHistoryItem from '@components/PointHistoryItem';
import { PATH } from '@constants/path';

const MyPage = () => {
  const [profile, setProfile] = useState({
    nickname: null,
    image: null,
    points: null,
  });
  const [pointHistory, setPointHistory] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pointHistoryPromise = fetch('/myPage/myPoint')
      .then((res) => res.json())
      .then((data) => {
        const { profile, park_points: parkPointHistory, mall_points: mallPointHistory } = data;
        const history = [...parkPointHistory, ...mallPointHistory];

        return { profile, history: history.slice(0, 3) };
      });

    const donationHistoryPromise = fetch('/myPage/mydonation/')
      .then((res) => res.json())
      .then((data) => {
        const { donation_points: history } = data;
        return { history: history.slice(0, 3) };
      });

    Promise.all([pointHistoryPromise, donationHistoryPromise])
      .then(([pointHistory, donationData]) => {
        const { profile: profileData, history: pointHistoryData } = pointHistory;
        const { history: donationHistoryData } = donationData;

        setProfile(profileData);
        setPointHistory(pointHistoryData);
        setDonationHistory(donationHistoryData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Layout>
        <Main>
          <Header>
            <span>마이페이지</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SettingButton type="button">
                <Icon name={ICON_NAME.SETTING} iconColor={COLOR.gray500} />
              </SettingButton>
              <LogoutButton type="button">로그아웃</LogoutButton>
            </div>
          </Header>
          <UserInfoLayout>
            <Icon name={ICON_NAME.PERSON} iconColor={COLOR.green100} width={128} height={128} />
            <UserInfo>
              <UserName>{profile.nickname}</UserName>
            </UserInfo>
          </UserInfoLayout>
          <ButtonLayout>
            <Button text="기부처 등록하기" eventName={() => navigate(PATH.DONATION_REGISTRATION)} />
          </ButtonLayout>
          <MyPointLayout>
            <Title>내 포인트</Title>
            <MyPointInfo>
              <Icon name={ICON_NAME.POINT2} iconColor={COLOR.green800} width={36} height={36} />
              <span>{profile.points ?? 0}p</span>
            </MyPointInfo>
          </MyPointLayout>
          <ListLayout>
            <ListTitle>
              <Title>포인트 적립 내역</Title>
              <IconButton type="button" onClick={() => navigate(PATH.POINT_HISTORY)}>
                <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.green800} width={32} height={32} />
              </IconButton>
            </ListTitle>
            {pointHistory.map(({ park, mall, pointActivityDate, earnedPoint }) => {
              // ? 백엔드에서 key 값 줄 수 있는지
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
          </ListLayout>
          <ListLayout>
            <ListTitle>
              <Title>기부 내역</Title>
              <IconButton type="button" onClick={() => navigate(PATH.DONATION_HISTORY)}>
                <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.green800} width={32} height={32} />
              </IconButton>
            </ListTitle>
            {donationHistory.map(({ id, date, price, name, image, title }) => {
              return (
                <DonationHistoryItem
                  key={id}
                  name={name}
                  title={title}
                  point={price}
                  imgSrc={image}
                  createdAt={new Date(date)}
                />
              );
            })}
          </ListLayout>
        </Main>
      </Layout>
      <TabBar currentTab={TAB_NAME.MY_PAGE} />
    </>
  );
};

export default MyPage;

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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR.black};
  ${FONT.title1}
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 12px 20px;
  background: ${COLOR.green500};
  color: ${COLOR.white};
  ${FONT.headline}
`;

const UserInfoLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserName = styled.span`
  color: ${COLOR.black};
  ${FONT.title2}
`;

const SettingButton = styled.button`
  background-color: transparent;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0px;
`;

const Title = styled.span`
  color: ${COLOR.green800};
  ${FONT.title3}
`;

const IconButton = styled.button`
  background: transparent;
`;

const MyPointLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const MyPointInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 12px;
  border-radius: 16px;
  background-color: ${COLOR.green50};
  color: ${COLOR.green800};
  ${FONT.title3};
`;

const ListLayout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0px;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
