import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '@store/AuthContextProvider';

import POINT from '@assets/point.svg';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import Button from '@common/Button';
import { BUTTON_NAME } from '@constants/buttonName';
import { PATH } from '@constants/path';

const GainPoint = () => {
  const [point, setPoint] = useState(10);

  useEffect(() => {
    fetch('/myPage/', {
      // headers: {
      //   Authorization: `Token ${token}`,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        setPoint(data.profile.points);
      });
  }, []);

  return (
    <Container>
      <img src={POINT} width={117} style={{ marginBottom: '36px' }} />
      <P>{point}P 획득 완료 💰</P>
      <TotalP>
        현재 누적 포인트: <span>{point}P</span>
      </TotalP>
      <Button text={BUTTON_NAME.HOME} path={PATH.HOME} />
    </Container>
  );
};

export default GainPoint;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 60px;
`;

const P = styled.p`
  ${FONT.body}
  font-size: 35px;
  font-weight: bold;
  color: ${COLOR.green600};
  margin-bottom: 40px;
`;

const TotalP = styled.p`
  ${FONT.subhead}
  margin-bottom: 174px;

  span {
    color: ${COLOR.green500};
    font-weight: bold;
  }
`;
