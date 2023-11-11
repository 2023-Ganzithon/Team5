import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { TAB_NAME } from '@constants/tabName';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import DonationHistoryItem from '@components/DonationHistoryItem';
import { AuthContext } from '@store/AuthContextProvider';
import { PATH } from '@constants/path';

const DonationHistory = () => {
  const [donationAmount, setDonationAmount] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/myPage/mydonation/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { donation_points: history, total_donation_amount: totalDonationAmount } = data;

        setDonationAmount(totalDonationAmount);
        setDonationHistory(history);
      });
  }, []);

  return (
    <>
      <Layout>
        <Header title="기부 내역" backUrl={PATH.MY_PAGE} />
        <Main>
          <CurrentDonationInfo>
            <span>name님이 현재 기부한 총 포인트는</span>
            <span>{donationAmount}p</span>
          </CurrentDonationInfo>
          <DonationHistoryList>
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
          </DonationHistoryList>
        </Main>
      </Layout>
      <TabBar currentTab={TAB_NAME.MY_PAGE} />
    </>
  );
};

export default DonationHistory;

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

const CurrentDonationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 12px;
  border-radius: 16px;
  background-color: ${COLOR.green50};
  color: ${COLOR.green800};
  ${FONT.title3}
`;

const DonationHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
